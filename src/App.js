import { LogoLoginMobile } from './LogoLoginMobile';
import './App.css';
import emailjs from 'emailjs-com';
import { useState } from 'react';

export default function Contato({ children, titleAuth, isNavigation = true }) {
  const [empresa, setEmpresa] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [message, setMessage] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    if (empresa === '' || vendedor === '' || message === '') {
      alert("POR FAVOR, PREENCHA TODOS OS CAMPOS!");
      return;
    }

    const templateParams = {
      from_empresa: empresa,
      message: message,
      vendedor: vendedor,
    }

    emailjs.send("service_fpn1n9l", "template_jp4qeqd", templateParams, "yh-7Jj5mqsnSmFTUC")
      .then((response) => {
        setEmpresa('');
        setVendedor('');
        setMessage('');
        alert("SUGESTÃO ENVIADA COM SUCESSO!", response.status, response.text);
      })
      .catch((err) => {
        alert("ERRO AO ENVIAR: ", err);
      });
  }

  return (
    <div className="flex flex-col" id='contato'>
      <form onSubmit={sendEmail} className="mb-16 from-red-600 to-red-800 bg-gradient-to-t h-32 md:h-40 relative flex justify-center">
        <div className="absolute -bottom-20">
          <LogoLoginMobile />
        </div>

        <p className="font-bold text-center py-8 text-xl">{titleAuth}</p>
        <div className="w-full max-w-[480px] mx-auto px-4">
          {children}
          {isNavigation && (
            <div className="my-10">

              <div className='div-title'>
                <h1 className='title'>Comentar sugestão</h1>
              </div>
            <div className='empresa'>
              <label className='label'>Empresa</label>
              <input
                className='flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
                autoComplete="off"
                autoCapitalize="off"
                placeholder='Digite o nome da empresa'
                onChange={(e) => setEmpresa(e.target.value)}
                value={empresa}
                />
            </div><br></br>

              <label className='label'>Vendedor</label>
              <input
                className='flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
                autoComplete="off"
                autoCapitalize="off"
                placeholder='Nome vendedor(a)'
                onChange={(e) => setVendedor(e.target.value)}
                value={vendedor}
              />

              <div className='suggestion'>
                <label className='label'>Sugestão</label>
                <textarea
                  className='flex h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
                  autoComplete="off"
                  autoCapitalize="off"
                  placeholder='Escreva sua sugestão/ideia'
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
              </div>

              <div className='button'>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary:red  h-11 px-4 py-2 w-full"
                  type="submit"
                  value="enviar">Enviar</button>
              </div>

            </div>
          )}
        </div>
      </form>
    </div>
  );
}
