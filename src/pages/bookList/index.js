import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
} from "@mui/material";
import BookListFilters from "components/bookListFilters";
import Loading from "components/loading";
import BooksListBasket from "containers/booksListBasket";
import UserController from "controllers/user";
import routes from "routes/routes";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BooksBasketListChange,
  showBooksBasketContainer,
} from "store/action-creators/app";
import { booksBasketSelector } from "store/selectors/app";
import UserSelect from "components/userSelect";
import { NavHashLink } from "react-router-hash-link";
import "./index.scss";

export default function BookList() {
  const booksBasket = useSelector(booksBasketSelector, shallowEqual);
  const dispatch = useDispatch();
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const getBookList = async () => {
    setLoading(true);
    return await UserController.getBookList();
  };
  const handleAddToCard = (books) => () => {
    dispatch(BooksBasketListChange([books, ...booksBasket]));
  };

  const handleOpenBasket = () => {
    dispatch(showBooksBasketContainer(true));
  };

  const handleDeleteFromBasket = (bookId) => () => {
    const newBookList = booksBasket.filter((elem) => elem.bookId !== bookId);
    dispatch(BooksBasketListChange(newBookList));
  };

  useEffect(() => {
    getBookList().then((res) => {
      setBookList(res.data.data);
    });
    setLoading(false);
  }, []);
  return (
    <div className="main">
      <>
        <nav>
          <div className="navright">
            <Link to="/user">
              ԵԻՊՔ ԳՐԱԴԱՐԱՆ
            </Link>
          </div>
          <div className="navleft">

            <Link to={routes.user}>ՀԻՄՆԱԿԱՆ ԷՋ</Link>
            <Link to={routes.myBooks}>ԻՄ ԳՐՔԵՐԸ</Link>
            <UserSelect setLoading={setLoading} />
          </div>
        </nav>
        {loading && <Loading />}
        <BooksListBasket />
        <div className="booksList-container-wrapper">
          <div className="book-header"></div>
          <div className="header-wrapper">
            <div className="booklist-header">
              <div>
                <NavHashLink smooth to="#header" className="header-logo" >
                  ԳՐՔԵՐԻ ՑԱՆԿ
                </NavHashLink>
              </div>
              <div>
                <IconButton onClick={handleOpenBasket}>
                  <LocalGroceryStoreIcon className="card-icon" />
                </IconButton>
              </div>
            </div>
          </div>

          <div className="books-wrapper">
            <div className="bookList-filters-wrapper">
              <BookListFilters bookList={bookList} setBookList={setBookList} />
            </div>
            <div className="books-list">
              {bookList?.map((book) => {
                const { bookId, name, author, description } = book;
                return (
                  <Card sx={{ width: "25rem" }} key={bookId}>
                    <CardActionArea>
                      <CardContent>
                        <img
                          className="book-item-header-image"
                          alt=""
                          src="https://yazidharoun.files.wordpress.com/2020/11/how-to-format-a-book-3.jpg"
                        />
                        <div className="bookList-book-card-cardContent-wrapper">
                          <h4>Գրքի անուն: {name}</h4>
                          <h5>Գրքի հեղինակ: {author}</h5>
                          <p>Գրքի մեկնաբանություն: {description}</p>
                          <div className="buttons-container">
                            {booksBasket.some(
                              (elem) => elem.bookId === bookId
                            ) ? (
                              <Button
                                variant="outlined"
                                onClick={handleDeleteFromBasket(bookId)}
                              >
                                Ջնջել ամրագրումների ցուցակից
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                onClick={handleAddToCard(book)}
                              >
                                Ավելացնել ամրագրումների ցուցակում
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
