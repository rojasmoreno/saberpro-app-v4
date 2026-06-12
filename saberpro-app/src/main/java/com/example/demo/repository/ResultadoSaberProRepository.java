package com.example.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.ResultadoSaberPro;

public interface ResultadoSaberProRepository extends JpaRepository<ResultadoSaberPro, Long> {
    ResultadoSaberPro findByEstudianteId(Long estudianteId);
}