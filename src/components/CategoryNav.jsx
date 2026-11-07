import React from 'react';
import { CATEGORIES } from '../data/projects';

export default function CategoryNav({ activeCategory, onSelectCategory, totalCount }) {
  return (
    <nav
      id="category-filter-nav"
      className="category-filter-wrapper"
      aria-label="Filter Projects by Category"
    >
      <div className="category-filter-inner">
        <ul className="category-pill-list">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  id={`filter-cat-${cat.id}`}
                  data-category={cat.id}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                  aria-pressed={isActive}
                >
                  {cat.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="category-actions-right">
          <div className="category-meta-badge">
            <span className="meta-bracket">[</span>
            <span className="meta-count">{totalCount} {totalCount === 1 ? 'EXPERIENCE' : 'EXPERIENCES'}</span>
            <span className="meta-bracket">]</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
