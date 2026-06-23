import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
import { getFirestoreDb, isFirebaseConfigured } from "../lib/firebase";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

function toIsoString(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }
  return "";
}

function mapProjectDoc(id: string, data: DocumentData): Project {
  return {
    id,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    link: String(data.link ?? data.Glink ?? ""),
    order_index: Number(data.order_index ?? 0),
    created_at: toIsoString(data.created_at),
    updated_at: toIsoString(data.updated_at),
  };
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const db = getFirestoreDb();
    if (!db) return;

    try {
      setLoading(true);
      setError(null);

      const snapshot = await getDocs(
        query(collection(db, "projects"), orderBy("order_index", "asc")),
      );

      setProjects(
        snapshot.docs.map((doc) => mapProjectDoc(doc.id, doc.data())),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const db = getFirestoreDb();
    if (!db) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const projectsQuery = query(
      collection(db, "projects"),
      orderBy("order_index", "asc"),
    );

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        setProjects(
          snapshot.docs.map((doc) => mapProjectDoc(doc.id, doc.data())),
        );
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return {
    projects,
    loading,
    error,
    refetch,
    isConfigured: isFirebaseConfigured,
  };
};
