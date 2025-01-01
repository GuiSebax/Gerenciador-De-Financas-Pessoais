import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bottom-0 mt-auto w-full">
      <div className="bg-gradient-to-br from-light-green-800 via-light-green-600 to-light-green-800 p-2">
        <p className="text-center text-xs font-bold text-white">
          Desenvolvido por Guilherme Clemente
          <span className="block mt-1">
            Meu GitHub - <a href="https://github.com/GuiSebax" target='_blank' rel="noopener noreferrer" className="text-light-green-50 hover:underline">GitHub</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;