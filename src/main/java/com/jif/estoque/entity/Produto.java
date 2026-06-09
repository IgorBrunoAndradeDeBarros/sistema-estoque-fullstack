package com.jif.estoque.entity;

import com.jif.estoque.enums.Unidade;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "produto")
public class Produto extends PanacheEntity {
    @Column(name = "codigo", length = 50, unique = true, nullable = false)
    public String codigo;

    @Column(name = "nome", length = 150, nullable = false)
    public String nome;

    public String descricao;

    public String categoria;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidade", nullable = false)
    public Unidade unidade;

    @Column(name = "preco_custo", precision = 12, scale = 2)
    public BigDecimal precoCusto;

    @Column(name = "estoque_min", precision = 12, scale = 3)
    public BigDecimal estoqueMin;

    @ManyToOne
    @JoinColumn(name = "fornecedor_id")
    public Fornecedor fornecedor;

    @Column(name = "ativo", nullable = false)
    public Boolean ativo = true;

}
