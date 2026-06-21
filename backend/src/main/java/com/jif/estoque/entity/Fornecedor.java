package com.jif.estoque.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "fornecedor")
public class Fornecedor extends PanacheEntity {

    @Column(name = "razao_social", length = 200, nullable = false)
    public String razaoSocial;

    @Column(length = 18, unique = true)
    public String cnpj;

    public String email;

    public String telefone;

    @Column(nullable = false)
    public Boolean ativo = true;
}