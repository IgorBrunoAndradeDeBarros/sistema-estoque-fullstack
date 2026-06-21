package com.jif.estoque.dto;

import com.jif.estoque.enums.Unidade;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoDetalheDTO {

    private Long id;
    private String codigo;
    private String nome;
    private String descricao;
    private String categoria;
    private Unidade unidade;
    private BigDecimal precoCusto;
    private BigDecimal estoqueMin;
    private boolean ativo;

    private String nomeFornecedor;

    private BigDecimal quantidade;
    private BigDecimal custoMedio;
}
