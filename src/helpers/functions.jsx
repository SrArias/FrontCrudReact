import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alert(title,icon,foco='') {

  onfocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: title,
    icon: icon
  });
}

function onfocus(foco) {
  if (foco === 'color') {
    document.getElementById('color').focus();
  } else if (foco === 'talla') {
    document.getElementById('talla').focus();
  } else if (foco === 'tipo') {
    document.getElementById('tipo').focus();
  } else if (foco === 'precio') {
    document.getElementById('precio').focus();
  }
}