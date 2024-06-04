export default function NavigationBar() {
  return (
    <nav className="bg-[#778F80] text-white p-8 flex justify-between font-thin">
      <div className="flex">Niki</div>

      <li className="flex gap-8">
        <ul>About</ul>
        <ul>Contact</ul>
        <ul>Home</ul>
      </li>
    </nav>
  );
}
