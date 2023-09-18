package com.ssafy.dksl.util;

import com.ssafy.dksl.util.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static org.springframework.security.core.authority.AuthorityUtils.createAuthorityList;

@Component
public class JwtUtil implements InitializingBean {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final long validityInSeconds;  // token 유효 기간
    private final String secret;
    private Key key;


    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.token-validity-in-seconds}") long validityInSeconds, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.secret = secret;
        this.validityInSeconds = validityInSeconds;  // application.properties에 설정
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    // Bean 주입 받은 후 할당
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰 정보
    public String generateToken(String clientId, String role) {
        Claims claims = Jwts.claims().setSubject(clientId);  // 사용하는 클레임 세트
        claims.put("role", role);  // 임의 역할 부여
        key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder().setClaims(claims).setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + validityInSeconds)) // 해당 옵션 없으면 expire X
                .signWith(key, SignatureAlgorithm.HS512) // 사용할 암호화 알고리즘과 signature에 들어갈 secret 값
                .compact();
    }

    // 토큰으로부터 받은 정보를 기반으로 Authentication 객체 반환
    public Authentication getAuthentication(String accessToken) {
        return new UsernamePasswordAuthenticationToken(getClientId(accessToken), "", createAuthorityList(getRole(accessToken)));
    }

    // 토큰 검증
    public boolean validateToken(String token) throws InvalidTokenException {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new InvalidTokenException("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            throw new InvalidTokenException("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            throw new InvalidTokenException("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            throw new InvalidTokenException("JWT 토큰이 잘못되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidTokenException();
        }
    }

    // Authorization Header를 통해 인증
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // 토큰에 담겨있는 clientId 획득
    public String getClientId(String token) {
        return String.valueOf(Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody().getSubject());
    }

    private String getRole(String accessToken) {
        return (String) Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(accessToken)
                .getBody()
                .get("role", String.class);

    }

}
