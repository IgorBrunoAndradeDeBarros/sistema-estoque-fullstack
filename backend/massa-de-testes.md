# Massa de Testes — API Estoque

Este arquivo traz os bodies prontos (já incluídos também na collection do Postman) e a ordem recomendada de execução, com o que esperar em cada chamada.

> Os endpoints de Produto/Movimentação esperam `fornecedorId` e `produtoId` reais. Na collection, isso é automático via *test scripts* que salvam o ID da resposta em variáveis (`{{fornecedorId}}`, `{{produtoId}}`, etc). Se for testar manualmente fora do Postman, troque esses valores pelos IDs reais retornados.

---

## 1. Fornecedor

**POST** `/fornecedores`
```json
{
  "razaoSocial": "Distribuidora Alfa Ltda",
  "cnpj": "12345678000190",
  "email": "contato@alfa.com.br",
  "telefone": "11999990000",
  "ativo": true
}
```
Esperado: `201`, retorna o fornecedor com `id`.

---

## 2. Produtos

**POST** `/produtos` (Produto 1 — estoque mínimo baixo, propício a gerar alerta)
```json
{
  "codigo": "PRD-001",
  "nome": "Parafuso Sextavado 1/4",
  "descricao": "Parafuso sextavado em aço inox 1/4 x 1",
  "categoria": "Fixadores",
  "unidade": "UN",
  "precoCusto": 0.35,
  "estoqueMin": 100,
  "fornecedorId": 1,
  "ativo": true
}
```

**POST** `/produtos` (Produto 2)
```json
{
  "codigo": "PRD-002",
  "nome": "Cabo Flexível 2.5mm",
  "descricao": "Cabo flexível 2.5mm 750V",
  "categoria": "Elétrica",
  "unidade": "M",
  "precoCusto": 2.10,
  "estoqueMin": 50,
  "fornecedorId": 1,
  "ativo": true
}
```
Esperado: `201` para ambos.

---

## 3. Movimentações

### 3.1 Entradas (criam saldo, calculam custo médio)

**POST** `/movimentacoes/entrada` (Produto 1)
```json
{
  "produtoId": 1,
  "quantidade": 500,
  "custoUnit": 0.35,
  "docRef": "NF-1001",
  "motivo": "Compra inicial"
}
```

**POST** `/movimentacoes/entrada` (Produto 2)
```json
{
  "produtoId": 2,
  "quantidade": 200,
  "custoUnit": 2.10,
  "docRef": "NF-1002",
  "motivo": "Compra inicial"
}
```
Esperado: `201`. Saldo do produto 1 = 500 un; produto 2 = 200 m.

### 3.2 Saída normal

**POST** `/movimentacoes/saida`
```json
{
  "produtoId": 1,
  "quantidade": 50,
  "docRef": "OS-2001",
  "motivo": "Consumo em ordem de serviço"
}
```
Esperado: `201`. Saldo do produto 1 cai para 450.

### 3.3 Saída que dispara alerta de estoque mínimo

**POST** `/movimentacoes/saida`
```json
{
  "produtoId": 1,
  "quantidade": 400,
  "docRef": "OS-2002",
  "motivo": "Consumo em massa para teste de alerta de estoque mínimo"
}
```
Esperado: `201`. Saldo cai para 50, que é ≤ `estoqueMin` (100) → deve gerar registro em `Alerta` do tipo `ESTOQUE_MINIMO`.

### 3.4 Saída com saldo insuficiente (teste negativo)

**POST** `/movimentacoes/saida`
```json
{
  "produtoId": 1,
  "quantidade": 99999,
  "docRef": "OS-2003",
  "motivo": "Teste de saldo insuficiente"
}
```
Esperado: `400` — "Saldo insuficiente para essa saída".

### 3.5 Ajuste positivo

**POST** `/movimentacoes/ajuste`
```json
{
  "produtoId": 2,
  "quantidade": 10,
  "motivo": "Ajuste de inventário - sobra encontrada"
}
```
Esperado: `201`. Saldo produto 2 sobe para 210.

### 3.6 Ajuste negativo (gera alerta de estoque zerado/mínimo)

**POST** `/movimentacoes/ajuste`
```json
{
  "produtoId": 2,
  "quantidade": -180,
  "motivo": "Ajuste de inventário - perda/avaria"
}
```
Esperado: `201`. Saldo produto 2 cai para 30, abaixo do `estoqueMin` (50) → gera alerta.

> ⚠️ Atenção: no código de `registrarAjuste`, a quantidade é somada diretamente (`saldo.quantidade.add(dto.getQuantidade())`), então um ajuste negativo depende do DTO aceitar valores negativos em `quantidade`. Vale testar esse caso para confirmar o comportamento.

### 3.7 Ajuste sem motivo (teste negativo — validação obrigatória)

**POST** `/movimentacoes/ajuste`
```json
{
  "produtoId": 2,
  "quantidade": 5
}
```
Esperado: `400` — "Motivo é obrigatório para ajuste".

---

## 4. Saldos

**GET** `/saldos` → lista geral.
**GET** `/saldos/1` → saldo do produto 1 (deve refletir 50 após os testes acima).
**GET** `/saldos/2` → saldo do produto 2 (deve refletir 30).

---

## 5. Produtos críticos

**GET** `/produtos/criticos`
Esperado: retorna produto 1 e produto 2, já que ambos ficaram com saldo ≤ estoque mínimo após os testes de saída/ajuste.

---

## 6. Alertas

**GET** `/alertas` → deve listar os alertas gerados nos passos 3.3 e 3.6.
**GET** `/alertas?lido=false` → mesmos alertas, ainda não lidos.
**GET** `/alertas/count` → contagem de não lidos (esperado: 2, conforme massa acima).
**PATCH** `/alertas/{id}/ler` → marca um alerta específico como lido (`204`).
**PATCH** `/alertas/ler-todos` → marca todos como lidos (`204`).

---

## 7. Testes negativos adicionais sugeridos

| Cenário | Endpoint | Esperado |
|---|---|---|
| Produto inexistente em entrada | `POST /movimentacoes/entrada` com `produtoId: 99999` | `404` |
| Produto inexistente em saída | `POST /movimentacoes/saida` com `produtoId: 99999` | `404` |
| Buscar produto inexistente | `GET /produtos/99999` | `404` |
| Buscar fornecedor inexistente | `GET /fornecedores/99999` | `404` |
| Buscar movimentação inexistente | `GET /movimentacoes/99999` | `404` |
| Marcar alerta inexistente como lido | `PATCH /alertas/99999/ler` | `404` |

---

## Ordem de execução recomendada (Postman Runner)

1. Fornecedores → Cadastrar Fornecedor
2. Produtos → Cadastrar Produto / Cadastrar Produto 2
3. Movimentações → Registrar Entrada / Registrar Entrada (Produto 2)
4. Movimentações → Registrar Saída
5. Movimentações → Registrar Saída (gera alerta - estoque mínimo)
6. Movimentações → Registrar Saída (saldo insuficiente - 400 esperado)
7. Movimentações → Registrar Ajuste (positivo) / (negativo) / (sem motivo)
8. Saldos → Listar Saldos / Buscar Saldo por Produto
9. Produtos → Listar Produtos Críticos
10. Alertas → Listar / Contar / Marcar como lido / Marcar todos como lidos

Na collection, os IDs são propagados automaticamente entre as chamadas via *Tests* scripts, então rodando nessa ordem (manual ou via Collection Runner) tudo encadeia sozinho.
