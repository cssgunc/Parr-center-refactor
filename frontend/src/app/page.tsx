"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useGetDocuments } from "@/hooks/useGetDocuments";
import { useEffect, useState } from "react";


export default function Home() {
  const { getDoc } = useGetDocuments();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDoc("users");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className={styles.page}>
      <main>
        <h1>Users</h1>
        {users.length > 0 ? (
          <ul>
            {users[0].name} - {users[0].email}
          </ul>
        ) : (
          <p>Loading users...</p>
        )}
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
