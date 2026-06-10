package com.jif.estoque.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoSaldoDTO {

    private Long id;
    private String codigo;
    private String nome;
    private BigDecimal estoqueMin;
    private BigDecimal quantidadeAtual;
}
