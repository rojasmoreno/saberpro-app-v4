package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Docente;

public interface DocenteRepository extends JpaRepository<Docente, Long> {
    List<Docente> findByFacultadId(Long facultadId);
    Docente findByCedula(String cedula);
}