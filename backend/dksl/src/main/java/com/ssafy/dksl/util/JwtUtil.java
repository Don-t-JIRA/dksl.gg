package com.ssafy.dksl.util;

import com.ssafy.dksl.util.exception.InvalidTokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil implements InitializingBean {

    private final long validityInSeconds;  // token 유효 기간
    private final String secret;
    private Key key;

    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.token-validity-in-seconds}") long validityInSeconds) {
        this.secret = secret;
        this.validityInSeconds = validityInSeconds;  // application.properties에 설정
    }

    @Override
    public void afterPropertiesSet() {  // Bean 주입 받은 후 할당
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String clientId) {  // 토큰 생성
        Claims claims = Jwts.claims().setSubject(clientId);  // 사용하는 클레임 세트
        key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + validityInSeconds)) // 해당 옵션 없으면 expire X
                .signWith(key, SignatureAlgorithm.HS512) // 사용할 암호화 알고리즘과 signature에 들어갈 secret 값
                .compact();
    }

    public boolean validateToken(String token) throws InvalidTokenException {  // 토큰 검즘
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
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

}
