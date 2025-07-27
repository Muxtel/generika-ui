import {ReactNode} from 'react';
import { request as __request } from '@/client/core/request';

function renderSmartValue(value: any): ReactNode {
  if (value === null || value === undefined) return "-";

  if (typeof value === "boolean") return value ? "✔️" : "❌";

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return (
      <ul style={{ margin: 0, paddingLeft: "1em" }}>
        {value.map((v, i) => (
          <li key={i}>{renderSmartValue(v)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    // Cas courant : object avec champ 'nom' ou 'name'
    if ("nom" in value) return value.nom;
    if ("name" in value) return value.name;
    // Sinon JSON compacté
    return <code>{JSON.stringify(value)}</code>;
  }

  if (typeof value === "string" && isIsoDate(value)) {
    return new Date(value).toLocaleDateString();
  }

  return String(value);
}

// Vérifie si une string est au format ISO 8601
function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T/.test(value);
}

// Transforme "type_tache" → "Type Tache"
// Ceci ne sert plus à rien étant donnée qu'on peut récupérer les title et description via les schemas !!!!
function formatLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


export {renderSmartValue, isIsoDate, formatLabel};
