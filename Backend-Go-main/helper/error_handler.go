package helper

import (
	"greenenvironment/constant"
	"net/http"

	"github.com/labstack/echo/v4"
)

func ConvertResponseCode(err error) int {
	switch err {
	// General Error
	case constant.BadRequest:
		return http.StatusBadRequest

	// Users Error
	case constant.UserNotFound:
		return http.StatusNotFound
	case constant.ErrEmptyLogin:
		return http.StatusBadRequest
	case constant.ErrLoginIncorrectPassword:
		return http.StatusUnauthorized
	case constant.ErrEmptyEmailRegister:
		return http.StatusBadRequest
	case constant.ErrEmptyPasswordRegister:
		return http.StatusBadRequest
	case constant.ErrEmptyAddressRegister:
		return http.StatusBadRequest
	case constant.ErrEmptyNameRegister:
		return http.StatusBadRequest
	case constant.ErrEmptyGenderRegister:
		return http.StatusBadRequest
	case constant.ErrEmailAlreadyExist:
		return http.StatusConflict
	case constant.ErrUsernameAlreadyExist:
		return http.StatusConflict
	case constant.ErrRegister:
		return http.StatusInternalServerError
	case constant.ErrGenerateJWT:
		return http.StatusInternalServerError
	case constant.ErrValidateJWT:
		return http.StatusUnauthorized
	case constant.ErrHashPassword:
		return http.StatusInternalServerError
	case constant.ErrEmptyPhoneRegister:
		return http.StatusBadRequest
	case constant.ErrRegister:
		return http.StatusInternalServerError
	case constant.ErrUpdateUser:
		return http.StatusInternalServerError
	case constant.ErrEmptyUpdate:
		return http.StatusBadRequest
	case constant.ErrEmailUsernameAlreadyExist:
		return http.StatusConflict
	case constant.ErrEmptyEmail:
		return http.StatusBadRequest
	case constant.ErrEmailNotFound:
		return http.StatusNotFound
	case constant.ErrForgotPassword:
		return http.StatusInternalServerError
	case constant.ErrOTPNotValid:
		return http.StatusBadRequest
	case constant.ErrOTPExpired:
		return http.StatusBadRequest
	case constant.ErrEmptyOTP:
		return http.StatusBadRequest
	case constant.ErrResetPassword:
		return http.StatusInternalServerError
	case constant.ErrDeleteUser:
		return http.StatusInternalServerError
	case constant.ErrEmptyResetPassword:
		return http.StatusBadRequest
	case constant.ErrInvalidEmail:
		return http.StatusBadRequest


	// Default
	default:
		return http.StatusInternalServerError
	}
}
func HandleEchoError(err error) (int, string) {
	if _, ok := err.(*echo.HTTPError); ok {
		return http.StatusBadRequest, constant.BadInput
	}
	return http.StatusBadRequest, constant.BadInput
}

func UnauthorizedError(c echo.Context) error {
	return c.JSON(http.StatusUnauthorized, FormatResponse(false, constant.Unauthorized, nil))
}
func InternalServerError(c echo.Context) error {
	return c.JSON(http.StatusInternalServerError, FormatResponse(false, constant.InternalServerError, nil))
}
func JWTErrorHandler(c echo.Context, err error) error {
	return c.JSON(http.StatusUnauthorized, FormatResponse(false, constant.Unauthorized, nil))
}
