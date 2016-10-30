import StatementExpression from './core/eval/eval';
import StatementReturn     from './states/return';
import StatementAssign     from './states/assign';
import StatementBreak      from './states/break';
import StatementFunc       from './states/func';
import StatementFor        from './states/for';
import StatementIf         from './states/if';
import StatementOp         from './states/op';

export default {
    StatementAssign,
    StatementIf,
    StatementOp,
    StatementFor,
    StatementFunc,
    StatementBreak,
    StatementReturn,
    StatementExpression
}