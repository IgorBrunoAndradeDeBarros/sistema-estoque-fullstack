package com.jif.estoque.entity;

import com.jif.estoque.enums.TipoMovimentacao;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacao")
public class Movimentacao extends PanacheEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public TipoMovimentacao tipo;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    public Produto produto;

    @Column(precision = 12, scale = 3, nullable = false)
    public BigDecimal quantidade;

    @Column(name = "custo_unit", precision = 12, scale = 2)
    public BigDecimal custoUnit;

    @Column(name = "doc_ref", length = 100)
    public String docRef;

    @Column(length = 255)
    public String motivo;

    @Column(name = "data_hora", nullable = false)
    public LocalDateTime dataHora = LocalDateTime.now();
}