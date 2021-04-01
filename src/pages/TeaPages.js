import React,{useState, useEffect} from "react";
import { Container, Row,Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../components/ProductCard";
import productActions from "../redux/actions/product.actions";
import PaginationBar from "../components/PaginationBar";
import {useHistory} from "react-router-dom";



const TeaPages = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const products = useSelector((state) => state.product.products);
  const totalPages = useSelector((state) => state.product.totalPages);
  const [pageNum, setPageNum] = useState(1);
  const limit = 6;
  const [category,setCategory] = useState("tea")

  useEffect(() => {
    dispatch(productActions.getAllProducts(pageNum,limit,category));
  }, [dispatch,pageNum,limit,category]);
    
  
  // const handleClick = () =>{
  //   console.log("jhjh",e.target.value)
  //   dispatch(productActions.getAllProducts(pageNum,limit,category));
  // }

  const handleClickProduct = (id) => {
    history.push(`/products/${id}`)
  }

  return (
    <div>
    <Container fluid className="text-center tea-header">
        <h1 className="header-title">TEA</h1>
        <ul className="menu-list">
          <button className='header-menu-item' value="tea" onClick={(e)=>setCategory(e.target.value)} >ALL</button>
          <button className='header-menu-item' value="brew tea" onClick={(e)=>setCategory(e.target.value)} >BREW TEA</button>
          <button className='header-menu-item' value="herbal tea" onClick={(e)=>setCategory(e.target.value)}>HERBAL TEA</button>
          <button className='header-menu-item' value="flower tea" onClick={(e)=>setCategory(e.target.value)}>FLOWER TEA</button>
        </ul>
    </Container>
    <Container className="py-5 d-flex justify-content-center">
      <Row>
      {products.map((p)=>(
        <ProductCard product ={p} handleClickProduct={handleClickProduct}/>
      ))}
      </Row>
      
    </Container>
    <PaginationBar pageNum={pageNum} setPageNum={setPageNum} totalPages={totalPages}/>
    </div>
  );
};

export default TeaPages;
