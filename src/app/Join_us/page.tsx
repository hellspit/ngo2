const navItems: NavItem[] = [
  { label: 'Home', icon: <Globe size={20} />, href: '/' },
  { label: 'About Us', icon: <Info size={20} />, href: '/about' },
  { label: 'Media', icon: <FileText size={20} />, href: '/media' },
  { label: 'Space Community', icon: <Users size={20} />, href: '/community' },
  { label: 'Contact us', icon: <Mail size={20} />, href: '/contact' },
]; 

<h4>Quick Links</h4>
<ul>
  <li><Link href="/about">About Us</Link></li>
  <li><Link href="/media">Media</Link></li>
  <li><Link href="/community">Space Community</Link></li>
  <li><Link href="/contact">Contact Us</Link></li>
</ul> 