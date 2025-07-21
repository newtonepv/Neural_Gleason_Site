import React from 'react';
import styles from '../styles/contact.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Entre em Contato</h1>
      
      <div className={styles.content}>
        <div className={styles.infoSection}>
          <h2>Informações de Contato</h2>
          <p className='pb-6'>
            Estamos sempre dispostos a esclarecer dúvidas, receber feedback ou discutir possíveis 
            parcerias!
          </p>
          
          <div className={styles.contactItem}>
            <h3>Email</h3>
            <p>Em breve disponibilizaremos um email para contato.</p>
          </div>
          
          <div className={styles.contactItem}>
            <h3>Laboratórios</h3>
            <p>Universidade de São Paulo (USP)</p>
            <p>Campus de São Carlos - Departamento de Computação</p>
            <p>Campus de Bauru - Departamento de Engenharia Biomédica</p>
          </div>
          
          <div className={styles.contactItem}>
            <h3>Redes Sociais</h3>
            <p>Em breve estaremos presentes nas principais redes sociais.</p>
          </div>
        </div>
        
        <div className={styles.formSection}>
          <h2>Formulário de Contato</h2>
          <p className={styles.formInfo}>
            Preencha o formulário abaixo para entrar em contato com nossa equipe. 
            Responderemos o mais breve possível.
          </p>
          
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nome completo</label>
              <input type="text" id="name" name="name" placeholder="Seu nome completo" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="seu.email@exemplo.com" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="institution">Instituição (opcional)</label>
              <input type="text" id="institution" name="institution" placeholder="Nome da sua instituição" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="subject">Assunto</label>
              <input type="text" id="subject" name="subject" placeholder="Assunto da mensagem" required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Mensagem</label>
              <textarea id="message" name="message" placeholder="Digite sua mensagem aqui..." rows={5} required></textarea>
            </div>
            
            <div className={styles.formSubmit}>
              <button type="submit" className={styles.submitButton}>Enviar Mensagem</button>
              <p className={styles.disclaimer}>
                * Este formulário é apenas um modelo. A funcionalidade de envio será implementada em breve.
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.faqSection}>
        <h2>Perguntas Frequentes</h2>
        
        <div className={styles.faqItem}>
          <h3>Como posso colaborar com o projeto ProstaScan AI?</h3>
          <p>
            Estamos sempre abertos a colaborações de pesquisadores, desenvolvedores e profissionais da saúde.
            Entre em contato conosco detalhando como você gostaria de colaborar com o projeto.
          </p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>O sistema já está disponível para uso clínico?</h3>
          <p>
            No momento, o ProstaScan AI está em fase de desenvolvimento e validação. Não está disponível
            para uso clínico. Acompanhe nossas atualizações para saber quando o sistema estará disponível.
          </p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Como posso acessar o código-fonte do projeto?</h3>
          <p>
            O repositório do projeto será disponibilizado em breve. Estamos trabalhando para organizar
            a documentação e o código antes de torná-lo público.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;