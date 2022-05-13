import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Modal,
} from "@mui/material";
import Button from "@mui/material/Button";
import BooksListBasketDatePickers from "components/booksListBasketDatePickers";
import UserController from "controllers/user";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  BooksBasketListChange,
  showBooksBasketContainer,
} from "store/action-creators/app";
import {
  booksBasketSelector,
  showBooksBasketContainerSelector,
} from "store/selectors/app";
// import scss
import "./index.scss";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: "5rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BooksListBasket() {
  const [datePickersData, setDatePickerData] = useState({});
  const showBasketContainer = useSelector(
    showBooksBasketContainerSelector,
    shallowEqual
  );
  const booksList = useSelector(booksBasketSelector, shallowEqual);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(showBooksBasketContainer(false));
  };

  const handleDeleteBookFromBasket = (bookId) => () => {
    const newBookList = booksList.filter((elem) => elem.bookId !== bookId);
    dispatch(BooksBasketListChange(newBookList));
  };

  const handleReserveBooks = async () => {
    let error = false;
    const newBookList = booksList.map(({ bookId }) => {
      if (
        datePickersData[bookId] &&
        datePickersData[bookId].borrowingDate &&
        datePickersData[bookId].returnDate
      ) {
        return {
          bookId,
          borrowingDate: datePickersData[bookId].borrowingDate,
          returnDate: datePickersData[bookId].returnDate,
        };
      }
      return (error = true);
    });
    if (error) return toast.error("Please fill al fields");
    const response = await UserController.ReserveNewBook(newBookList);
    if (!response.hasError) {
      dispatch(BooksBasketListChange([]));
      dispatch(showBooksBasketContainer(false));
    }
  };

  return (
    <Modal onClose={handleCloseModal} open={showBasketContainer}>
      <Box sx={style}>
        <div className="modal-container">
          <div className="modal-header">
            <h3>Ամրագրումների ցուցակ</h3>
          </div>
          {!isEmpty(booksList) && (
            <>
              <div className="booksList-wrapper">
                {booksList.map(
                  ({ bookId, image, name, author, description }, index) => (
                    <Card sx={{ maxWidth: "25rem" }} key={bookId}>
                      <CardActionArea>
                        {image && (
                          <CardMedia
                            component="img"
                            height="140"
                            image={image}
                            alt="Book"
                          />
                        )}
                        <CardContent>
                          <div className="bookList-book-card-cardContent-wrapper">
                            <h4>Գրքի անուն: {name}</h4>
                            <h5>Գրքի հեղինակ: {author}</h5>
                            <p>Գրքի մեկնաբանություն: {description}</p>
                            <BooksListBasketDatePickers
                              state={datePickersData}
                              setState={setDatePickerData}
                              bookId={bookId}
                            />
                            <div className="buttons-container">
                              <Button
                                variant="outlined"
                                onClick={handleDeleteBookFromBasket(bookId)}
                              >
                                Ջնջել ամրագրումների ցուցակից
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  )
                )}
              </div>
              <div className="modal-submitButton-wrapper">
                <Button onClick={handleReserveBooks} variant="contained">
                  Ամրագրել
                </Button>
              </div>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
}
