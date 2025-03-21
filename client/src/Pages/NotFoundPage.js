import React from 'react'

function NotFoundPage() {
  return (
    <div className="container-fluid py-5">
  <div className="container py-5 text-center">
    <ol className="breadcrumb justify-content-center mb-5">
      <li className="breadcrumb-item">
        <a href="/">Home</a>
      </li>
      <li className="breadcrumb-item">
        <a href="/">Pages</a>
      </li>
      <li className="breadcrumb-item active text-dark">404</li>
    </ol>
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <i className="bi bi-exclamation-triangle display-1 text-secondary" />
        <h1 className="display-1">404</h1>
        <h1 className="mb-4">Sayfa Bulunamadı</h1>
        <p className="mb-4">
          Aradığınız sayfa sitemizde bulunmuyor. Anasayfamzdaki ara motorunu kullanmaya ne dersin?
        </p>
        <a href="/"
          className="btn link-hover border border-primary rounded-pill py-3 px-5"
        >
          AnaSayfaya Geri Dön
        </a>
      </div>
    </div>
  </div>
</div>
  )
}

export default NotFoundPage