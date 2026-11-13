class Matricula {
    constructor(estudante_id, curso_id, numeroMatricula, dataMatricula, status = 'ATIVA') {
        this.estudante_id = estudante_id;
        this.curso_id = curso_id;
        this.numeroMatricula = numeroMatricula;
        this.dataMatricula = dataMatricula;
        this.status = status;
    }
}

module.exports = Matricula;