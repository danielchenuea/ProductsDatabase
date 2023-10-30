import { Produto, ProdutoGet } from "../models/produto.models";
import $ from "jquery";

class ProductService {
    route = "http://localhost:3000/products";

    // constructor(route: string) {
    //     this.route = route;
    // }

    public GetListaProdutos(): Promise<Produto[]> {
        return new Promise<Produto[]>((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: this.route,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                success: (res: ProdutoGet[]) => {
                    let temp_res: Produto[];

                    temp_res = res.map((el: ProdutoGet): Produto => {
                        return {
                            id: el.id,
                            title: el.title,
                            description: el.description,
                            quantity: el.quantity,
                            date_input: Date.parse(el.date_input),
                        };
                    });
                    return resolve(temp_res);
                },
                error: (res) => {
                    return reject(res.responseText);
                },
            });
        });
    }

    public GetProduto(id: string): Promise<Produto> {
        return new Promise<Produto>((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: this.route,
                data: { id: id },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                success: (res: ProdutoGet[]) => {
                    let temp_res: Produto;
                    temp_res = {
                        id: res[0].id,
                        title: res[0].title,
                        description: res[0].description,
                        quantity: res[0].quantity,
                        date_input: Date.parse(res[0].date_input),
                    };
                    // console.log(res[0].date_input);
                    // console.log(Date.parse(res[0].date_input));
                    // console.log(
                    //     new Date(Date.parse(res[0].date_input)).toLocaleString(
                    //         "en-GB"
                    //     )
                    // );
                    return resolve(temp_res);
                },
                error: (res) => {
                    return reject(res);
                },
            });
        });
    }

    public AddProduto(product: Produto): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: this.route,
                data: product,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                success: () => {
                    return resolve(true);
                },
                error: () => {
                    return reject(false);
                },
            });
        });
    }

    public AtualizarProduto(product: Produto): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            $.ajax({
                type: "PATCH",
                url: this.route,
                data: product,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                success: () => {
                    return resolve(true);
                },
                error: () => {
                    return reject(false);
                },
            });
        });
    }

    public RemoverProduto(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            $.ajax({
                type: "PATCH",
                url: this.route,
                data: { id: id },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                success: () => {
                    return resolve(true);
                },
                error: () => {
                    return reject(false);
                },
            });
        });
    }
}

export default ProductService;
