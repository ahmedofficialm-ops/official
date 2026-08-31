/// <reference types="vite/client" />

declare module 'virtual:skills-catalog' {
  export const skills: Array<{
    name: string
    description: string
    version: string
    related: string[]
  }>
}
