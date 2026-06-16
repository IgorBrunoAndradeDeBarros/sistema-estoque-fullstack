package com.jif.estoque.entity;

import com.jif.estoque.enums.TipoAlerta;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Alerta")
public class Alerta extends PanacheEntity {

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    public Produto produto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public TipoAlerta tipoAlerta;

    @Column(length = 255, nullable = false)
    public String mensagem;

    @Column(nullable = false)
    public Boolean lido = false;

    @Column(name = "criado_em", nullable = false)
    public LocalDateTime criadoEm = LocalDateTime.now();
}
