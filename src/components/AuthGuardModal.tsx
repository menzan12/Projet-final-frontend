export default function AuthGuardModal() {
  return (
    <dialog id="auth_modal" className="modal">
      <div className="modal-box text-center py-10">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <h3 className="font-bold text-xl">Connexion requise</h3>
        <p className="py-4 text-gray-600">
          Vous devez être connecté pour réserver ce service.
        </p>
        <div className="modal-action justify-center gap-4">
          <a href="/login" className="btn btn-primary px-8">
            Se connecter
          </a>
          <a href="/register" className="btn btn-outline px-8">
            S'inscrire
          </a>
        </div>
      </div>
    </dialog>
  );
}
