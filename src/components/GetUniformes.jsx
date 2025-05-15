import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../helpers/functions";
import {getAllUniformes,createUniforme,updateUniforme,deleteUniforme} from "../services/uniformeService";

const GetUniformes = () => {

  const [uniformes, setUniformes] = useState([]);
  const [id, setId] = useState(true);
  const [color, setColor] = useState(null);
  const [talla, setTalla] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [precio, setPrecio] = useState(null);
  const [operacion, setOperacion] = useState(1);
  const [tittle, setTitle] = useState("");

  useEffect(() => {
    cargarUniformes();
  }, []);

  const cargarUniformes = async () => {
    await getAllUniformes()
    .then((response) => {
        setUniformes(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
  
  };

  const openModal = (op, uniforme = {}) => {
    setOperacion(op);
    if (op === 1) {
        setTitle("Agregar Uniforme");
        setId(0);
        setColor("");
        setTalla("");
        setTipo("");
        setPrecio("");
    } else if (op === 2) {
        setTitle("Modificar Uniforme");
        setId(uniforme.id);
        setColor(uniforme.color);
        setTalla(uniforme.talla);
        setTipo(uniforme.tipo);
        setPrecio(uniforme.precio);
    }

    setTimeout(() => {
      document.getElementById("tipo")?.focus();
    }, 500);
  };

  const enviarModulo = () => {
    if (!tipo || tipo.trim() === "") {
        show_alert("El campo tipo es obligatorio", "warning");
        return;
    }
    if (!color || color.trim() === "") {
        show_alert("El campo color es obligatorio", "warning");
        return;
    }
    if (!talla || talla.trim() === "") {
        show_alert("El campo talla es obligatorio", "warning");
        return;
    }
    if (!precio || precio.trim() === "") {
        show_alert("El campo precio es obligatorio", "warning");
        return;
    }

    if (operacion === 1) {
        postUniforme();
    } else if (operacion === 2) {
        putUniforme();
    }
  };

  const postUniforme = async () => {
    const data = {
        tipo: tipo.trim(),
        color: color.trim(),
        talla: talla.trim(),
        precio: precio.trim()
    };
    
    try {
        const response = await createUniforme(data);
        if (response.status === 200) {
            cargarUniformes();
            show_alert("El uniforme se creó correctamente", "success");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (error) {
        console.log(error);
        show_alert("Error al crear el uniforme", "error");
    }
  };

  const putUniforme = async () => {
    const data = {
        id: id,
        tipo: tipo.trim(),
        color: color.trim(),
        talla: talla.trim(),
        precio: precio.trim()
    };
    try {
        const response = await updateUniforme(data);
        if (response.status === 200) {
            cargarUniformes();
            show_alert("El uniforme se actualizó correctamente", "success");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (error) {
        console.log(error);
        show_alert("Error al actualizar el uniforme", "error");
    }
};


  const eliminarUniformeConfirmado = async (id) => {
    try {
      const res = await deleteUniforme(id);
      if (res.status === 200) {
        show_alert("El uniforme se eliminó correctamente", "success");
        cargarUniformes();
      }
    } catch (error) {
      console.error(error);
      show_alert("Error al eliminar el uniforme", "error");
    }
  };

  const eliminarUniforme = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Está seguro de eliminar el uniforme?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) eliminarUniformeConfirmado(id);
    });
  };

  return (
    <div className="App">
      <div className="container-fluid"> 
        <div className="row mt-3" >
            <div className="col-md-4 offset-md-4">
              <div className="d-grid mx-auto" >
                <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalUniforme" onClick={() => openModal(1)}>
                    <i className="fa-solid fa-plus"></i> Agregar Uniforme
                </button>
              </div>
            </div>
        </div>
        <div className="row mt-3">
            <div className="col-md-4 offset-md-4">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Color</th>
                            <th>Talla</th>
                            <th>Tipo</th>                            
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider"> 
                        {uniformes.map((uniforme,i) => (
                            <tr key={uniforme.id}>
                                <td>{(i+1)}</td>
                                <td>{uniforme.color}</td>
                                <td>{uniforme.talla}</td>
                                <td>{uniforme.tipo}</td>
                                <td>${new Intl.NumberFormat('es-CO').format(uniforme.precio)}</td>
                                <td>
                                    <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalUniforme" onClick={() => openModal(2,uniforme)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    &nbsp;
                                    <button className="btn btn-danger" onClick={() => eliminarUniforme(uniforme.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
      </div>
      </div>
        
      <div id="modalUniforme" className='modal fade' aria-hidden="true">
            <div className="modal-dialog" >
              <div className="modal-content">
                <div className="modal-header">
                  <label className="h5">{tittle}</label>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input type="hidden" id="id" ></input>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-shirt"></i></span>
                    <input type="text" className="form-control" id="tipo" placeholder="Tipo de uniforme" value={tipo} onChange={(e) => setTipo(e.target.value)}></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-palette"></i></span>
                    <input type="text" className="form-control" id="color" placeholder="Color de uniforme" value={color} onChange={(e) => setColor(e.target.value)}></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-ruler"></i></span>
                    <input type="text" className="form-control" id="talla" placeholder="Talla de uniforme" value={talla} onChange={(e) => setTalla(e.target.value)}></input>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa-solid fa-dollar-sign"></i></span>
                    <input type="text" className="form-control" id="precio" placeholder="Precio de uniforme" value={precio} onChange={(e) => setPrecio(e.target.value)}></input>
                  </div>
                  <div className="d-grid gap-2">
                    <button className="btn btn-success" onClick={() => enviarModulo()} >
                      <i className="fa-solid fa-floppy-disk"></i> Guardar
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default GetUniformes
