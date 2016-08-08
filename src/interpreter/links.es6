import StatementExpression from './core/eval/eval';
import StatementAssign     from './states/assign';
import StatementBreak      from './states/break';
import StatementFunc       from './states/func';
import StatementFor        from './states/for';
import StatementIf         from './states/if';

export default {
    StatementAssign,
    StatementIf,
    StatementFor,
    StatementFunc,
    StatementBreak,
    StatementExpression
}