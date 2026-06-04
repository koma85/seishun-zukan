"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ZukanState, DiagnosisResult } from "@/types";

const STORAGE_KEY = "seishun-zukan-state";

const defaultState: ZukanState = {
  discoveredIds: [],
  diagnosisResult: null,
};

interface ZukanContextValue {
  state: ZukanState;
  discover: (id: string) => void;
  discoverMultiple: (ids: string[]) => void;
  isDiscovered: (id: string) => boolean;
  saveDiagnosisResult: (result: DiagnosisResult) => void;
  resetAll: () => void;
}

const ZukanContext = createContext<ZukanContextValue | null>(null);

export function ZukanProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ZukanState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState(JSON.parse(raw));
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ZukanState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }, []);

  const discover = useCallback(
    (id: string) => {
      setState((prev) => {
        if (prev.discoveredIds.includes(id)) return prev;
        const next = { ...prev, discoveredIds: [...prev.discoveredIds, id] };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const discoverMultiple = useCallback(
    (ids: string[]) => {
      setState((prev) => {
        const newIds = ids.filter((id) => !prev.discoveredIds.includes(id));
        if (newIds.length === 0) return prev;
        const next = { ...prev, discoveredIds: [...prev.discoveredIds, ...newIds] };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const isDiscovered = useCallback(
    (id: string) => state.discoveredIds.includes(id),
    [state.discoveredIds]
  );

  const saveDiagnosisResult = useCallback(
    (result: DiagnosisResult) => {
      const next = { ...state, diagnosisResult: result };
      persist(next);
    },
    [state, persist]
  );

  const resetAll = useCallback(() => {
    persist(defaultState);
  }, [persist]);

  if (!hydrated) return null;

  return (
    <ZukanContext.Provider
      value={{ state, discover, discoverMultiple, isDiscovered, saveDiagnosisResult, resetAll }}
    >
      {children}
    </ZukanContext.Provider>
  );
}

export function useZukan() {
  const ctx = useContext(ZukanContext);
  if (!ctx) throw new Error("useZukan must be used within ZukanProvider");
  return ctx;
}
