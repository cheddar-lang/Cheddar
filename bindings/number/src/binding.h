#ifndef BINDING_H_
#define BINDING_H_

#define UNWRAP(name) Nan::ObjectWrap::Unwrap<NumberObject>(name)
#define SELF_BOILERPLATE NumberObject *self = UNWRAP(info.Holder());
#define BOILERPLATE SELF_BOILERPLATE                                           \
    num_t value;                                                               \
    if (info[0]->IsNumber())                                                   \
        value = info[0]->NumberValue();                                        \
    else                                                                       \
        value = UNWRAP(info[0]->ToObject())->value;
#define RETURN info.GetReturnValue().Set(info.Holder());

typedef double  num_t;
typedef int64_t int_t;

class NumberObject: public Nan::ObjectWrap {
    public:
        // This will create and initalize all the fields of our class
        static NAN_MODULE_INIT(Init);
        num_t value;
    
    private:
        // Helper function to create the real number object
        explicit NumberObject(num_t value): value(value) {};
        ~NumberObject() {};
        
        // This is our real constructor
        static NAN_METHOD(New);
    
        // Utility Methods
        static NAN_METHOD(ToString);
        static NAN_METHOD(IsInteger);
        static NAN_METHOD(AccessAt);
        
        // Here are all of our math methods
        static NAN_METHOD(Add);
        static NAN_METHOD(Minus);
        static NAN_METHOD(Times);
        static NAN_METHOD(Divide);
        static NAN_METHOD(Power);
        static NAN_METHOD(Log);
        static NAN_METHOD(LogN);
        static NAN_METHOD(Mod);
        static NAN_METHOD(Sqrt);
        static NAN_METHOD(Cbrt);
        static NAN_METHOD(Root);

        // Trig functions
        static NAN_METHOD(Tan);
        static NAN_METHOD(Cos);
        static NAN_METHOD(Sin);
        static NAN_METHOD(Atan);
        static NAN_METHOD(Acos);
        static NAN_METHOD(Asin);

        // Rounding methods
        static NAN_METHOD(Floor);
        static NAN_METHOD(Ceil);
        static NAN_METHOD(Round);
        static NAN_METHOD(Abs);
        static NAN_METHOD(Sign);
        
        // Comp methods
        static NAN_METHOD(Gt);
        static NAN_METHOD(Gte);
        static NAN_METHOD(Lt);
        static NAN_METHOD(Lte);
        static NAN_METHOD(Eq);
        static NAN_METHOD(Neq);
        static NAN_METHOD(Not);

        // Binary methods
        static NAN_METHOD(BinaryAnd);
        static NAN_METHOD(BinaryNot);
        static NAN_METHOD(BinaryOr);
        static NAN_METHOD(BinaryXor);
        static NAN_METHOD(BinaryLeft);
        static NAN_METHOD(BinaryRight);
        
        static inline Nan::Persistent<v8::Function> & constructor() {
            static Nan::Persistent<v8::Function> ctr;
            return ctr;
        }
};

#endif
