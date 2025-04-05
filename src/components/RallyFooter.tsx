
import { motion } from "framer-motion";

const RallyFooter = () => {
  return (
    <motion.footer 
      className="bg-rally-black text-white py-8 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-rally-red">Rally</span>Engage
            </h3>
            <p className="text-gray-400">
              Plateforme d'engagement en ligne pour rallyes automobiles
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  Calendrier des rallyes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  Réglementation FIA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  Nous contacter
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations légales</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rally-red transition-colors">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} RallyEngage. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">
            Développé avec passion pour la communauté du rallye
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default RallyFooter;
