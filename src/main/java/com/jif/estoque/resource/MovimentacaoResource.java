package com.jif.estoque.resource;

import com.jif.estoque.dto.MovimentacaoDTO;
import com.jif.estoque.enums.TipoMovimentacao;
import com.jif.estoque.service.MovimentacaoService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.List;

@Path("/movimentacoes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MovimentacaoResource {

    @Inject
    MovimentacaoService movimentacaoService;

    @POST
    @Path("/entrada")
    public Response registrarEntrada(MovimentacaoDTO dto) {
        MovimentacaoDTO movimentacao = movimentacaoService.registrarEntrada(dto);
        return Response.status(201).entity(movimentacao).build();
    }

    @POST
    @Path("/saida")
    public Response registrarSaida(MovimentacaoDTO dto) {
        MovimentacaoDTO movimentacao = movimentacaoService.registrarSaida(dto);
        return Response.status(201).entity(movimentacao).build();
    }

    @POST
    @Path("/ajuste")
    public Response registrarAjuste(MovimentacaoDTO dto) {
        MovimentacaoDTO movimentacao = movimentacaoService.registrarAjuste(dto);
        return Response.status(201).entity(movimentacao).build();
    }

    @GET
    public Response listar(
            @QueryParam("tipo") TipoMovimentacao tipo,
            @QueryParam("produtoId") Long produtoId,
            @QueryParam("de") LocalDateTime de,
            @QueryParam("ate") LocalDateTime ate) {

        List<MovimentacaoDTO> movimentacoes = movimentacaoService.listar(tipo, produtoId, de, ate);
        return Response.ok(movimentacoes).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        MovimentacaoDTO movimentacao = movimentacaoService.buscarPorId(id);
        return Response.ok(movimentacao).build();
    }
}