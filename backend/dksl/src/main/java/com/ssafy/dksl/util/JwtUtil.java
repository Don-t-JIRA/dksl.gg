package com.ssafy.dksl.util;

import com.ssafy.dksl.model.entity.User;
import com.ssafy.dksl.model.repository.UserRepository;
import com.ssafy.dksl.util.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil implements InitializingBean {

    private final long validityInSeconds;  // token 유효 기간
    private final String secret;
    private Key key;

    private final UserRepository userRepository;


    @Autowired
    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.token-validity-in-seconds}") long validityInSeconds, UserRepository userRepository) {
        this.secret = secret;
        this.validityInSeconds = validityInSeconds;  // application.properties에 설정
        this.userRepository = userRepository;
    }

    // Bean 주입 받은 후 할당
    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // 토큰 생성
    public String generateToken(String clientId) {
        Claims claims = Jwts.claims().setSubject(clientId);  // 사용하는 클레임 세트
        key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder().setClaims(claims).setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + validityInSeconds)) // 해당 옵션 없으면 expire X
                .signWith(key, SignatureAlgorithm.HS512) // 사용할 암호화 알고리즘과 signature에 들어갈 secret 값
                .compact();
    }

    // 토큰 검즘
    public boolean validateToken(String token) throws InvalidTokenException {
        try {
            // Bearer 검증
            if (!token.substring(0, "BEARER ".length()).equalsIgnoreCase("BEARER ")) {
                return false;
            } else {
                token = token.split(" ")[1].trim();
            }
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token);
            // 만료되었을 시 false
            return !claims.getBody().getExpiration().before(new Date());
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

    // Authorization Header를 통해 인증을 한다.
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // 토큰에 담겨있는 clientId 획득
    public String getClientId(String token) {
        return Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token).getBody().getSubject();
    }

}
