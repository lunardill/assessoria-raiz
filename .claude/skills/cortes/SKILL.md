---
name: cortes
description: Analisa a transcrição de uma reunião gravada (colada no chat, com timestamp, só o Lucas falando) e identifica os trechos com potencial de viralizar no Instagram. Devolve timestamp, gancho sugerido e o motivo do potencial, e salva o relatório em conteudo/cortes/. Use quando o usuário colar uma transcrição com timestamp, mencionar "identifica os cortes", "acha os cortes dessa reunião", "quais trechos podem viralizar", "corte de reunião", ou chamar /cortes.
---

# Cortes de reunião

O Lucas grava toda reunião no celular e usa os melhores trechos como conteúdo pro Instagram (@olucaslunardi). O gargalo é garimpar, dentro de 1h+ de transcrição, os trechos com potencial real de viralizar. Essa skill faz esse garimpo.

## Antes de analisar

Ler `_contexto/preferencias.md` pra calibrar o tom dos ganchos sugeridos (direto, sem travessão, sem "tá", sem cara de IA).

## Input esperado

O usuário cola a transcrição direto no chat, com timestamp por trecho (ex: `[00:14:32] fala...`). É sempre só o Lucas falando, sem outros participantes — não precisa identificar quem fala.

Se a transcrição vier sem timestamp, avisar que não dá pra indicar o corte com precisão e pedir a versão com timestamp.

## Critérios de potencial viral

Um trecho é candidato a corte forte quando bate com pelo menos um destes (quanto mais critérios, mais forte o candidato):

1. **Contra-intuitivo** — quebra uma crença comum do mercado ("todo mundo acha X, mas é o contrário de Y")
2. **História real** — caso concreto de cliente, com nome de situação, número ou resultado
3. **Embate** — ele discorda de algo, confronta uma objeção, ou dá uma opinião polêmica ao vivo
4. **Dado surpreendente** — número, estatística ou fato que gera espanto
5. **Dica prática específica** — algo acionável que o espectador pode aplicar direto
6. **Virada emocional** — indignação, humor, ou revelação que muda o rumo da fala

O trecho também precisa fazer sentido sozinho, sem depender do resto da reunião pra ser entendido. Duração ideal 30-90 segundos de fala; pode sinalizar um trecho mais longo se o conteúdo for forte o suficiente pra justificar.

## Passo a passo

1. Ler a transcrição colada inteira antes de apontar qualquer corte
2. Mapear todos os trechos candidatos — não fixar em um número, listar quantos realmente atenderem aos critérios acima
3. Descartar trechos fracos: melhor entregar 3 cortes fortes que 8 genéricos
4. Ordenar do mais forte pro mais fraco
5. Pra cada corte, montar:
   - **Timestamp** (início e fim, conforme aparece na transcrição)
   - **Gancho sugerido** — frase de abertura pro post, no estilo que o Lucas já usa (direto, muitas vezes contra-intuitivo). Não usar travessão nem "tá"
   - **Por que funciona** — qual(is) critério(s) da lista acima esse trecho atende
   - **Resumo do trecho** — 1-2 frases do que é dito, não o texto completo
6. Mostrar a lista ordenada pro usuário no chat
7. Perguntar um nome curto pra identificar a reunião (cliente, tema, ou "sem nome") e salvar o relatório completo em `conteudo/cortes/AAAA-MM-DD-[nome].md`

## Formato do relatório salvo

```markdown
# Cortes — [nome da reunião] — [data]

## 1. [Gancho sugerido]
**Timestamp:** [00:14:32 – 00:15:40]
**Por que funciona:** [critério(s)]
**Resumo:** [1-2 frases]

## 2. [Gancho sugerido]
...
```

## Regras

- Nunca inventar timestamp que não esteja na transcrição
- Não forçar corte fraco só pra aumentar a quantidade
- O gancho tem que soar como o Lucas fala, nunca genérico de marketing ("descubra o segredo...")
- Sem travessão, sem "tá", sem formalidade excessiva
