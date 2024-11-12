export const WindowsLogo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16">
    <path d="M0 2l6.5-1v6.5H0V2zm7.5-1L16 0v7.5H7.5V1zm-7.5 8h6.5V16L0 15V9zm7.5 0H16V16l-8.5-1V9z" fill="currentColor" />
  </svg>
);

export const WindowControls = {
  Close: () => (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M10 1L9 0 5 4 1 0 0 1l4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4z" fill="currentColor" />
    </svg>
  ),
  Minimize: () => (
    <svg width="10" height="1" viewBox="0 0 10 1">
      <path d="M0 0h10v1H0z" fill="currentColor" />
    </svg>
  ),
  Maximize: () => (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <path d="M0 0v10h10V0H0zm9 9H1V1h8v8z" fill="currentColor" />
    </svg>
  )
};

export const SystemIcons = {
  Folder: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" fill="currentColor" />
    </svg>
  ),
  Browser: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z" fill="currentColor" />
    </svg>
  ),
  PC: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z" fill="currentColor"/>
    </svg>
  ),
  Trash: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
    </svg>
  ),
  File: () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
    </svg>
  )
};