package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "resultados_saber_pro")
public class ResultadoSaberPro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "estudiante_id")
    @JsonIgnoreProperties({"resultado", "facultad"})
    private Estudiante estudiante;

    private Integer puntaje;
    private String nivelSaberPro;

    private Integer comunicacionEscrita;
    private String comunicacionEscritaNivel;

    private Integer razonamientoCuantitativo;
    private String razonamientoCuantitativoNivel;

    private Integer lecturaCritica;
    private String lecturaCriticaNivel;

    private Integer competenciasCiudadanas;
    private String competenciasCiudadanasNivel;

    private Integer ingles;
    private String inglesNivel;

    private Integer formulacionProyectos;
    private String formulacionProyectosNivel;

    private Integer pensamientoCientifico;
    private String pensamientoCientificoNivel;

    private Integer disenoSoftware;
    private String disenoSoftwareNivel;

    private String nivelIngles;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Estudiante getEstudiante() { return estudiante; }
    public void setEstudiante(Estudiante estudiante) { this.estudiante = estudiante; }

    public Integer getPuntaje() { return puntaje; }
    public void setPuntaje(Integer puntaje) { this.puntaje = puntaje; }

    public String getNivelSaberPro() { return nivelSaberPro; }
    public void setNivelSaberPro(String nivelSaberPro) { this.nivelSaberPro = nivelSaberPro; }

    public Integer getComunicacionEscrita() { return comunicacionEscrita; }
    public void setComunicacionEscrita(Integer comunicacionEscrita) { this.comunicacionEscrita = comunicacionEscrita; }

    public String getComunicacionEscritaNivel() { return comunicacionEscritaNivel; }
    public void setComunicacionEscritaNivel(String comunicacionEscritaNivel) { this.comunicacionEscritaNivel = comunicacionEscritaNivel; }

    public Integer getRazonamientoCuantitativo() { return razonamientoCuantitativo; }
    public void setRazonamientoCuantitativo(Integer razonamientoCuantitativo) { this.razonamientoCuantitativo = razonamientoCuantitativo; }

    public String getRazonamientoCuantitativoNivel() { return razonamientoCuantitativoNivel; }
    public void setRazonamientoCuantitativoNivel(String razonamientoCuantitativoNivel) { this.razonamientoCuantitativoNivel = razonamientoCuantitativoNivel; }

    public Integer getLecturaCritica() { return lecturaCritica; }
    public void setLecturaCritica(Integer lecturaCritica) { this.lecturaCritica = lecturaCritica; }

    public String getLecturaCriticaNivel() { return lecturaCriticaNivel; }
    public void setLecturaCriticaNivel(String lecturaCriticaNivel) { this.lecturaCriticaNivel = lecturaCriticaNivel; }

    public Integer getCompetenciasCiudadanas() { return competenciasCiudadanas; }
    public void setCompetenciasCiudadanas(Integer competenciasCiudadanas) { this.competenciasCiudadanas = competenciasCiudadanas; }

    public String getCompetenciasCiudadanasNivel() { return competenciasCiudadanasNivel; }
    public void setCompetenciasCiudadanasNivel(String competenciasCiudadanasNivel) { this.competenciasCiudadanasNivel = competenciasCiudadanasNivel; }

    public Integer getIngles() { return ingles; }
    public void setIngles(Integer ingles) { this.ingles = ingles; }

    public String getInglesNivel() { return inglesNivel; }
    public void setInglesNivel(String inglesNivel) { this.inglesNivel = inglesNivel; }

    public Integer getFormulacionProyectos() { return formulacionProyectos; }
    public void setFormulacionProyectos(Integer formulacionProyectos) { this.formulacionProyectos = formulacionProyectos; }

    public String getFormulacionProyectosNivel() { return formulacionProyectosNivel; }
    public void setFormulacionProyectosNivel(String formulacionProyectosNivel) { this.formulacionProyectosNivel = formulacionProyectosNivel; }

    public Integer getPensamientoCientifico() { return pensamientoCientifico; }
    public void setPensamientoCientifico(Integer pensamientoCientifico) { this.pensamientoCientifico = pensamientoCientifico; }

    public String getPensamientoCientificoNivel() { return pensamientoCientificoNivel; }
    public void setPensamientoCientificoNivel(String pensamientoCientificoNivel) { this.pensamientoCientificoNivel = pensamientoCientificoNivel; }

    public Integer getDisenoSoftware() { return disenoSoftware; }
    public void setDisenoSoftware(Integer disenoSoftware) { this.disenoSoftware = disenoSoftware; }

    public String getDisenoSoftwareNivel() { return disenoSoftwareNivel; }
    public void setDisenoSoftwareNivel(String disenoSoftwareNivel) { this.disenoSoftwareNivel = disenoSoftwareNivel; }

    public String getNivelIngles() { return nivelIngles; }
    public void setNivelIngles(String nivelIngles) { this.nivelIngles = nivelIngles; }
}