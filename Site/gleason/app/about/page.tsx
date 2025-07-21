import React from 'react';
import styles from '../styles/about.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre o Projeto ProstaScan AI</h1>
      
      <section className={styles.section}>
        <h2>Nossa Missão</h2>
        <p>
          O ProstaScan AI é um projeto desenvolvido por alunos da Universidade de São Paulo (USP) dos campus de Bauru e São Carlos. 
          Nosso objetivo é desenvolver uma inteligência artificial capaz de classificar o câncer de próstata a partir de imagens histopatológicas, 
          seguindo o sistema de classificação de Gleason, e disponibilizá-la para uso através desta plataforma.
        </p>
      </section>

      <section className={styles.section}>
        <h2>O Projeto</h2>
        <p>
          O ProstaScan AI utiliza técnicas avançadas de aprendizado profundo para analisar lâminas histopatológicas 
          e fornecer uma classificação precisa do grau de câncer de próstata. Nossa equipe multidisciplinar reúne conhecimentos 
          em computação, engenharia biomédica e medicina para criar uma ferramenta que possa auxiliar patologistas e médicos 
          no diagnóstico e tratamento do câncer de próstata.
        </p>
        <div className={styles.highlight}>
          <p>
            Todo o código desenvolvido neste projeto é de código aberto, permitindo que outros pesquisadores e 
            desenvolvedores possam contribuir e aprimorar o sistema, fomentando a transparência e o avanço contínuo da tecnologia.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Metodologia</h2>
        <p>
          Nossa abordagem baseia-se em redes neurais convolucionais treinadas com um extenso conjunto de imagens histopatológicas 
          já classificadas por especialistas. A metodologia completa do projeto está disponível para consulta e inclui:
        </p>
        <div className={styles.methodology}>
          <div className={styles.methodStep}>
            <div className={styles.stepNumber}>1</div>
            <div>
              <h3>Coleta e Preparação de Dados</h3>
              <p>Digitalização e pré-processamento de lâminas histopatológicas de câncer de próstata.</p>
            </div>
          </div>
          <div className={styles.methodStep}>
            <div className={styles.stepNumber}>2</div>
            <div>
              <h3>Desenvolvimento do Modelo</h3>
              <p>Implementação e treinamento de redes neurais profundas para classificação das imagens.</p>
            </div>
          </div>
          <div className={styles.methodStep}>
            <div className={styles.stepNumber}>3</div>
            <div>
              <h3>Validação Clínica</h3>
              <p>Avaliação do desempenho do sistema com especialistas em patologia.</p>
            </div>
          </div>
          <div className={styles.methodStep}>
            <div className={styles.stepNumber}>4</div>
            <div>
              <h3>Implementação Web</h3>
              <p>Desenvolvimento da plataforma online para disponibilização do serviço.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Nossa Equipe</h2>
        <p>O ProstaScan AI é fruto do trabalho colaborativo de alunos e professores da USP:</p>
        
        <div className={styles.team}>
          <div className={styles.teamMember}>
            <h3 className={styles.memberName}>Prof. Dr. Agnaldo Nardi</h3>
            <p className={styles.memberRole}>Coordenador</p>
            <p className={styles.memberInstitution}>USP Bauru - [instituto]</p>
          </div>
          
          <div className={styles.teamMember}>
            <h3 className={styles.memberName}>Yan Faria</h3>
            <p className={styles.memberRole}>Aluno pesquisador</p>
            <p className={styles.memberInstitution}>USP Bauru - Medicina</p>
          </div>
          
          <div className={styles.teamMember}>
            <h3 className={styles.memberName}>Gabriel</h3>
            <p className={styles.memberRole}>Aluno pesquisador</p>
            <p className={styles.memberInstitution}>USP Bauru - Medicina</p>
          </div>
          
          <div className={styles.teamMember}>
            <h3 className={styles.memberName}>Italo Sena</h3>
            <p className={styles.memberRole}>Aluno pesquisador</p>
            <p className={styles.memberInstitution}>USP São Carlos - Bacharelado em Ciência de dados</p>
          </div>

          <div className={styles.teamMember}>
            <h3 className={styles.memberName}>Newton Eduardo Pena Villegas</h3>
            <p className={styles.memberRole}>Aluno pesquisador</p>
            <p className={styles.memberInstitution}>USP São Carlos - Bacharelado em Ciência da Computação</p>
          </div>
        </div>
      </section>
      
      <section className={styles.section}>
        <h2>Código Aberto e Transparência</h2>
        <p>
          Acreditamos que o avanço científico deve ser transparente e acessível. Por isso, todo o código-fonte 
          do ProstaScan AI está disponível em nosso repositório no GitHub, juntamente com documentação detalhada 
          sobre os métodos utilizados, conjuntos de dados e resultados obtidos.
        </p>
        <div className={styles.contactInfo}>
          <p>Repositório: <a href="https://github.com/ProstaScanAI" target="_blank" rel="noopener noreferrer">github.com/ProstaScanAI</a></p>
          <p>Documentação: <a href="https://prostascan.ai/docs" target="_blank" rel="noopener noreferrer">prostascan.ai/docs</a></p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Contato</h2>
        <p>
          Para mais informações sobre o projeto ProstaScan AI, entre em contato conosco:
        </p>
        <div className={styles.contactInfo}>
          <p>Email: <a href="mailto:contato@prostascan.ai">contato@prostascan.ai</a></p>
          <p>Laboratório de Inteligência Artificial - USP São Carlos</p>
          <p>Laboratório de Processamento de Imagens Médicas - USP Bauru</p>
        </div>
      </section>
    </div>
  );
};

export default About;