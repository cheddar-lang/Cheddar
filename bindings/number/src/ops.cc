#include <nan.h>
#include "binding.h"

#include <cmath>

#include <iostream>

template <typename T>
inline int signum(T val) {
    return (T(0) < val) - (val < T(0));
}

NAN_METHOD(NumberObject::Add) {
    BOILERPLATE
    self->value += value;
    RETURN
}

NAN_METHOD(NumberObject::Minus) {
    if (info.Length() == 0) {
        SELF_BOILERPLATE
        self->value = -(self->value);
    } else {
        BOILERPLATE
        self->value -= value;
    }
    RETURN
}

NAN_METHOD(NumberObject::Times) {
    BOILERPLATE
    self->value *= value;
    RETURN
}

NAN_METHOD(NumberObject::Divide) {
    BOILERPLATE
    self->value /= value;
    RETURN
}

NAN_METHOD(NumberObject::Power) {
    BOILERPLATE
    self->value = pow(self->value, value);
    RETURN
}

NAN_METHOD(NumberObject::Log) {
    SELF_BOILERPLATE
    self->value = log(self->value);
    RETURN
}

NAN_METHOD(NumberObject::LogN) {
    BOILERPLATE
    self->value = log(self->value) / log(value);
    RETURN
}

NAN_METHOD(NumberObject::Mod) {
    BOILERPLATE
    self->value = fmod(self->value, value);
    RETURN
}

NAN_METHOD(NumberObject::Sqrt) {
    SELF_BOILERPLATE
    self->value = sqrt(self->value);
    RETURN
}

NAN_METHOD(NumberObject::Cbrt) {
    SELF_BOILERPLATE
    self->value = cbrt(self->value);
    RETURN
}

NAN_METHOD(NumberObject::Root) {
    BOILERPLATE
    self->value = pow(self->value, 1.0 / value);
    RETURN
}



// Trig functions

NAN_METHOD(NumberObject::Tan) {
    SELF_BOILERPLATE
    self->value = tan(self->value);
    RETURN 
}

NAN_METHOD(NumberObject::Cos) {
    SELF_BOILERPLATE
    self->value = cos(self->value);
    RETURN 
}

NAN_METHOD(NumberObject::Sin) {
    SELF_BOILERPLATE
    self->value = sin(self->value);
    RETURN 
}

NAN_METHOD(NumberObject::Atan) {
    SELF_BOILERPLATE
    self->value = atan(self->value);
    RETURN 
}

NAN_METHOD(NumberObject::Acos) {
    SELF_BOILERPLATE
    self->value = acos(self->value);
    RETURN 
}

NAN_METHOD(NumberObject::Asin) {
    SELF_BOILERPLATE
    self->value = asin(self->value);
    RETURN 
}

// Rounding functions
NAN_METHOD(NumberObject::Sign) {
    SELF_BOILERPLATE
    self->value = signum(self->value);
    RETURN
}

NAN_METHOD(NumberObject::Ceil) {
    SELF_BOILERPLATE
    self->value = ceil(self->value);
    RETURN
}

NAN_METHOD(NumberObject::Floor) {
    SELF_BOILERPLATE
    self->value = floor(self->value);
    RETURN
}

NAN_METHOD(NumberObject::Abs) {
    SELF_BOILERPLATE
    self->value = std::fabs(self->value);
    RETURN
}

NAN_METHOD(NumberObject::Round) {
    SELF_BOILERPLATE
    self->value = round(self->value);
    RETURN
}

// Comparative functions

NAN_METHOD(NumberObject::Gt) {
    BOILERPLATE
    info.GetReturnValue().Set( self->value > value ? Nan::True() : Nan::False() );
}

NAN_METHOD(NumberObject::Gte) {
    BOILERPLATE
    info.GetReturnValue().Set( self->value >= value ? Nan::True() : Nan::False() );
}

NAN_METHOD(NumberObject::Lt) {
    BOILERPLATE
    info.GetReturnValue().Set( self->value < value ? Nan::True() : Nan::False() );
}

NAN_METHOD(NumberObject::Lte) {
    BOILERPLATE
    info.GetReturnValue().Set( self->value <= value ? Nan::True() : Nan::False() );
}

NAN_METHOD(NumberObject::Eq) {
    BOILERPLATE
    info.GetReturnValue().Set( self->value == value ? Nan::True() : Nan::False() );
}

NAN_METHOD(NumberObject::Neq) {
    BOILERPLATE
    info.GetReturnValue().Set( self->value != value ? Nan::True() : Nan::False() );
}

NAN_METHOD(NumberObject::Not) {
    SELF_BOILERPLATE
    info.GetReturnValue().Set( self->value == 0 ? Nan::True() : Nan::False() );
}


// Binary Methods
NAN_METHOD(NumberObject::BinaryAnd) {
    BOILERPLATE
    self->value = ((int_t) self->value) & ((int_t) value);
    RETURN
}

NAN_METHOD(NumberObject::BinaryNot) {
    SELF_BOILERPLATE
    self->value = ~((int_t) self->value);
    RETURN
}

NAN_METHOD(NumberObject::BinaryOr) {
    BOILERPLATE
    self->value = ((int_t) self->value) | ((int_t) value);
    RETURN
}

NAN_METHOD(NumberObject::BinaryXor) {
    BOILERPLATE
    self->value = ((int_t) self->value) ^ ((int_t) value);
    RETURN
}

NAN_METHOD(NumberObject::BinaryLeft) {
    BOILERPLATE
    self->value = ((int_t) self->value) << ((int_t) value);
    RETURN
}

NAN_METHOD(NumberObject::BinaryRight) {
    BOILERPLATE
    self->value = ((int_t) self->value) >> ((int_t) value);
    RETURN
}
