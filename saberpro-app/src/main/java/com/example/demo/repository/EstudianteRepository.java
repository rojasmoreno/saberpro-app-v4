package com.example.demo.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Estudiante;

public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    List<Estudiante> findByFacultadId(Long facultadId);
    Estudiante findByNumeroDocumento(String numeroDocumento);
}