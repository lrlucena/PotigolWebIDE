class ValorSimples{
  constructor(id, valor){
    this.id = id;
    this.valor = valor;
  }
  execute(){
    listenerData.setAmbiente(this.id.toString(), this.valor);
  }
}
exports.ValorSimples = ValorSimples;

class DeclVariavel{
  constructor(ids, valor){
    this.ids = ids;
    this.valor = valor;
  }
  execute(){
    this.ids.forEach(element => {
      this.setAmbiente(element, this.valor);
    });
  }
  setAmbiente(entrada, valor){
    listenerData.setAmbiente(entrada.toString(), valor);
  }
}
exports.DeclVariavel = DeclVariavel;

class Comparacao{
  constructor(expr1, expr2, operacao){
    this.expr1 = expr1;
    this.expr2 = expr2;
    this.operacao = operacao;
  }
  execute(){
    if(this.expr1.execute){
      this.expr1 = this.expr1.execute();
    }
    if(this.expr2.execute){
      this.expr2 = this.expr2.execute();
    }
    switch(this.operacao) {
      case '>':
        if(this.expr1 > this.expr2) return true;
        else return false
        break;
      case '<':
        if(this.expr1 < this.expr2) return true;
        else return false
        break;
      case '>=':
        if(this.expr1 >= this.expr2) return true;
        else return false
        break;
      case '<=':
        if(this.expr1 <= this.expr2) return true;
        else return false
        break;
      case '==':
        if(this.expr1 == this.expr2) return true;
        else return false
        break;
      case '<>':
        if(this.expr1 != this.expr2) return true;
        else return false
        break;
    } 
  }
}
exports.Comparacao = Comparacao;

class Exprlist{
  constructor(childrenlist){
    this.childrenlist = childrenlist;
  }
  execute(){
    this.childrenlist.forEach(element => {
      listenerData.getValue(element).execute();
    }); 
  }
}
exports.Exprlist = Exprlist;

class ID{
  constructor(variavel){
    this.variavel = variavel;
  }
  execute(){
    return listenerData.getAmbiente(this.variavel.toString());
  }
}
exports.ID = ID;

class Enquanto{
  constructor(condicao, bloco){
    this.condicao = condicao;
    this.bloco = bloco;
  }
  execute(){
    while(this.condicao.execute()) this.bloco.execute();
  }
}
exports.Enquanto = Enquanto;

class Senaose{
  constructor(expr, exprlist){
    this.expr = expr;
    this.exprlist = exprlist;
  }
  execute(){
    if(this.expr.execute()){
      this.exprlist.execute();
      return true;
    }
    return false;
  }
}
exports.Senaose = Senaose;


class Se{
  //listenerData.setValue(ctx, new potigol.Se(condicao,entao,senao,senaose));
  constructor(condicao, entao,senao,senaose){
    this.condicao = condicao;
    this.entao = entao;
    this.senao = senao;
    this.senaose = senaose;
  }
  execute(){
    if(this.condicao.execute()){
      this.entao.execute();
    }
    else{
      //Verifica senaose
      let snsExec = false;
      this.senaose.forEach(element => {
        if(snsExec == false){
          if(listenerData.getValue(element).execute()) snsExec = true;
        } 
      });
      if(!snsExec && this.senao){
        this.senao.execute();
      }
    }
  }
}
exports.Se = Se;

class Escreva{
  constructor(exp){
    this.texto = exp.getText().replace(/"/g, '');
  }
  execute(){
    listenerUtils.show(this.texto);
  }
}
exports.Escreva = Escreva;

class Imprima{
  constructor(exp){
    this.texto = exp.getText().replace(/"/g, '');
  }
  execute(){
    listenerUtils.show(this.texto);
  }
}
exports.Imprima = Imprima;