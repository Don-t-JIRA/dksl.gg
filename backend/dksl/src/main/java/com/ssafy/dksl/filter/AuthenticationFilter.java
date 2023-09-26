package com.ssafy.dksl.filter;

import com.ssafy.dksl.model.entity.RefreshToken;
import com.ssafy.dksl.model.repository.RefreshTokenRepository;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.InvalidTokenException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

// 여기서 UsernamePasswordAuthenticationToken 생성
// UsernamePasswordAuthenticationToken : 인증용 객체 생성
@Slf4j
@Component
    public class AuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthenticationFilter(JwtUtil jwtUtil, RefreshTokenRepository refreshTokenRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtUtil.resolveToken(request);

        try {
            // permitAll일 경우 거치지 X
            if (request.getHeader("Authorization") != null  && !request.getServletPath().contains("/reissue") && jwtUtil.validateToken(token)) {
                Authentication authentication = jwtUtil.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (InvalidTokenException e) {
            log.error(e.getMessage());
            errorResponse(request, response, e);
        }

    }

    private void errorResponse(HttpServletRequest request, HttpServletResponse response, InvalidTokenException e) throws IOException {
        response.setStatus(HttpStatus.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        String errorMessage = e.getMessage();
        byte[] errorMessageBytes = errorMessage.getBytes(StandardCharsets.UTF_8);
        response.getOutputStream().write(errorMessageBytes);
    }
}
