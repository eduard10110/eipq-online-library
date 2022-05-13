import { Button, Card, CardActionArea, CardContent } from "@mui/material";
import Loading from "components/loading";
import UserSelect from "components/userSelect";
import UserController from "controllers/user";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "routes/routes";
import { NavHashLink } from "react-router-hash-link";
import "./index.scss";

export default function MyBooks() {
  const [loading, setLoading] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  useEffect(() => {
    getMyBooks();
  }, []);
  const getMyBooks = async () => {
    setLoading(true);
    await UserController.getMyBookReservations()
      .then((res) => setMyBooks(res.data))
      .finally(() => setLoading(false));
  };

  const handleCancelReservation = (id) => async (e) => {
    setLoading(true);
    e.stopPropagation();
    await UserController.CancelBookReservation(id);
    await getMyBooks();
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="my-books-container-wrapper">
      <nav>
      <div className="navright">
          <NavHashLink smooth to="#header" >
            ԻՄ ԳՐՔԵՐԸ
          </NavHashLink>
        </div>
        <div className="navleft">

          <Link to={routes.user}>ՀԻՄՆԱԿԱՆ ԷՋ</Link>
          <Link to={routes.bookList}>ԳՐՔԵՐԻ ՑԱՆԿ</Link>
          <UserSelect setLoading={setLoading}/>
        </div>
      </nav>
        <div className="my-books-container-inner-wrapper">
          {myBooks.map(({ book, bookName, bookAuthor, status, id }) => {
            return book ? (
              <Card sx={{ width: "25rem" }} key={book?.bookId}>
                <CardActionArea>
                  <CardContent>
                    <img
                      className="book-item-header-image"
                      alt=""
                      src="https://yazidharoun.files.wordpress.com/2020/11/how-to-format-a-book-3.jpg"
                    />
                    <div className="bookList-book-card-cardContent-wrapper">
                      <h4>Գրքի անուն: {book?.name}</h4>
                      <h5>Գրքի հեղինակ: {book?.author}</h5>
                      <p>Գրքի մեկնաբանություն: {book?.description}</p>
                      <p>կարգավիճակ։ {status}</p>
                    </div>

                    {status === "Reserved" && (
                      <div className="card-footer-button">
                        <Button onClick={handleCancelReservation(id)}>
                          Չեղարկել
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            ) : (
              <Card sx={{ width: "25rem" }} key={book?.bookId}>
                <CardActionArea>
                  <CardContent>
                    <img
                      className="book-item-header-image"
                      alt=""
                      src="https://yazidharoun.files.wordpress.com/2020/11/how-to-format-a-book-3.jpg"
                    />
                    <div className="bookList-book-card-cardContent-wrapper">
                      <h4>Գրքի անուն: {bookName}</h4>
                      <h5>Գրքի հեղինակ: {bookAuthor}</h5>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
