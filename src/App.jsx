import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Simulons des cours
const cours = [
  { id: 1, titre: "Mathématiques - Débutant", niveau: "Débutant", description: "Les bases des maths" },
  { id: 2, titre: "Français - Intermédiaire", niveau: "Intermédiaire", description: "Grammaire et conjugaison" },
  { id: 3, titre: "Physique - Avancé", niveau: "Avancé", description: "Dynamique des systèmes" }
];

function Accueil() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur CoursPourTous</h1>
      <p>Apprenez à votre rythme, quel que soit votre niveau.</p>
    </div>
  );
}

function ListeCours() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Liste des cours</h2>
      <ul>
        {cours.map(c => (
          <li key={c.id} className="mb-4">
            <Link to={`/cours/${c.id}`} className="text-blue-600 underline">
              {c.titre} ({c.niveau})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailCours({ id }) {
  const coursDetail = cours.find(c => c.id === parseInt(id));
  if (!coursDetail) return <div className="p-6">Cours introuvable.</div>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{coursDetail.titre}</h2>
      <p className="mb-2"><strong>Niveau:</strong> {coursDetail.niveau}</p>
      <p>{coursDetail.description}</p>
    </div>
  );
}

function Connexion() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Connexion</h2>
      <form className="space-y-2">
        <input type="email" placeholder="Email" className="border p-2 w-full" />
        <input type="password" placeholder="Mot de passe" className="border p-2 w-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Se connecter</button>
      </form>
    </div>
  );
}

function Inscription() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Inscription</h2>
      <form className="space-y-2">
        <input type="text" placeholder="Nom" className="border p-2 w-full" />
        <input type="email" placeholder="Email" className="border p-2 w-full" />
        <input type="password" placeholder="Mot de passe" className="border p-2 w-full" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Créer un compte</button>
      </form>
    </div>
  );
}

function MonCompte() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Mon compte</h2>
      <p>Bienvenue dans votre espace personnel.</p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav className="bg-gray-100 p-4 flex gap-4">
        <Link to="/">Accueil</Link>
        <Link to="/cours">Cours</Link>
        <Link to="/connexion">Connexion</Link>
        <Link to="/inscription">Inscription</Link>
        <Link to="/mon-compte">Mon Compte</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/cours" element={<ListeCours />} />
        <Route
          path="/cours/:id"
          element={<CourseWrapper />}
        />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/mon-compte" element={<MonCompte />} />
      </Routes>
    </Router>
  );
}

function CourseWrapper() {
  const id = window.location.pathname.split("/").pop();
  return <DetailCours id={id} />;
}

export default App;
