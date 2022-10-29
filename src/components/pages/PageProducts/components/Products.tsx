import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { images } from "../../../../mocks/images";
//import { useAvailableProducts } from "~/queries/products";

export default function Products() {
  //const { data = [], isLoading } = useAvailableProducts();
  const [products, setProductList] = useState([]);
  const [stock, setStock] = useState([]);
  const data: any[] = [];
  // if (isLoading) {
  //   return <Typography>Loading...</Typography>;
  // }
  const productsUrl =
    "https://h4uuydbl93.execute-api.eu-west-1.amazonaws.com/products";

  const stockUrl =
    "https://h4uuydbl93.execute-api.eu-west-1.amazonaws.com/stock";

  //console.log(stockUrl);
  useEffect(() => {
    fetch(productsUrl)
      .then((res) => res.json())
      .then((products) => {
        // console.log(products.Items[0]);
        products.Items.forEach(
          (el: {
            description: { S: any };
            img: { S: any };
            price: { N: any };
            title: { S: any };
            id: { S: any };
          }) => {
            el.description = el.description.S;
            el.id = el.id.S;
            el.img = el.img.S;
            el.price = el.price.N;
            el.title = el.title.S;
          }
        );
        setProductList(products.Items);
      });

    fetch(stockUrl)
      .then((res) => res.json())
      .then((stock) => {
        stock.Items.forEach(
          (el: { product_id: { S: any }; count: { N: any } }) => {
            el.product_id = el.product_id.S;
            el.count = el.count.N;
          }
        );
        setStock(stock.Items);
      });
  }, [productsUrl, stockUrl]);

  for (let i = 0; i < products.length; i++) {
    data.push({
      // @ts-ignore: Spread types may only be created from object types
      ...products[i],
      // @ts-ignore: Spread types may only be created from object types
      ...stock.find((itmInner) => itmInner.product_id === products[i].id),
    });
  }

  console.log(data);
  return (
    <Grid container spacing={4}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {data.map(({ id, img, title, price }, i) => (
        <Grid item key={i} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              sx={{ pt: "56.25%" }}
              image={images.find((el) => el.includes(img))}
              //image={`https://source.unsplash.com/random?sig=${id}`}
              title={title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography>{formatAsPrice(price)}</Typography>
            </CardContent>
            <CardActions>
              {/* <AddProductToCart product={product} /> */}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
