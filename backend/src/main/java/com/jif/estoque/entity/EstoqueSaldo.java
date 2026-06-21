package com.jif.estoque.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "estoque_saldo")
public class EstoqueSaldo extends PanacheEntity {

    @OneToOne
    @JoinColumn(name = "produto_id", unique = true, nullable = false)
    public Produto produto;

    @Column(precision = 12, scale = 3, nullable = false)
    public BigDecimal quantidade = BigDecimal.ZERO;

    @Column(name = "custo_medio", precision = 12, scale = 2)
    public BigDecimal custoMedio;

}
