class Forca {

  constructor(palavraSecreta){
    this.palavraSecreta = palavraSecreta
    this.chutesDados = []
    this.chances = 6
    this.acertos = [] 
    this.definePalavra()   
  }
  
  chutar(letra) {            
    if (letra.length == 1 && this.chuteValido(letra)){
      this.chutesDados.push(letra)      
      if(this.acertouLetra(letra)){
        this.atualizaPalavra(letra)
      } else {        
        this.chances--
      }      
    } 
  }

  buscarEstado() {     
    if(this.chances === 0){
      return 'perdeu'
    }

    if(this.chances > 0 && this.ganhou()){
      return 'ganhou'
    }
    
    if(this.chances > 0 && !this.ganhou()){
      return 'aguardando chute'
    }
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
        letrasChutadas: this.chutesDados, // Deve conter todas as letras chutadas
        vidas: this.chances, // Quantidade de vidas restantes
        palavra: this.acertos // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      };
  }

  chuteValido(letra){

    if (!isNaN(letra)) return false

    for (let index = 0; index < this.chutesDados.length; index++) {
      if(this.chutesDados[index] === letra){
        return false
      }      
    }   

    return true
  }

  acertouLetra(letra){    
    if (this.palavraSecreta.includes(letra)) {
      return true
    }
    return false
  }

  definePalavra(){
    for (let i = 0; i < this.palavraSecreta.length; i++) {
      this.acertos.push('_')
    }
  }

  atualizaPalavra(letra){
    this.palavraSecreta.split('').forEach((element, index) => {
      if(element === letra) this.acertos[index] = letra
    });
  }

  ganhou(){
    if(this.acertos.join('') === this.palavraSecreta){
      return true
    }
    return false
  }
}

module.exports = Forca;