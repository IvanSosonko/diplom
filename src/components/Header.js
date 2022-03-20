import "./components.css"
import HeroesStore from '../store/HeroesStore'
import { observer } from "mobx-react-lite"
import helpIcon from '../assets/help.svg'
import React from "react"

const Header = observer(() => {
    const [isHover, setIshover] = React.useState(false)
    return (
        <article className="header">
            <section style={{ marginLeft: "10px" }}>Dota Counter Picker</section>
            {HeroesStore.isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : <div />}
            <section style={{height:"20px",width:"20px"}} onMouseLeave={() => { setIshover(false) }} onMouseOver={() => { setIshover(true) }}>
                <img src={helpIcon} style={{ margin: "auto 20px" }} height="20" width="20" />
                <span style={{ position: "absolute", display: isHover ? "inherit" : "none", background: "#000000", fontSize: "14px", width: "80%",padding:"10px" }}>
                    Как я должен использовать этот инструмент?
                    Вы должны просмотреть лучшие предложения и решить для себя, какой герой, по вашему мнению, работает лучше.
                    Вы должны выбрать роль, которая нужна вашей команде, и подумать о линии, на которую вы пойдете.
                    Сборщик может помочь вам выйти за пределы вашей зоны комфорта, выбирая героев, которых вы обычно не рассматриваете, но определенно рекомендуется иметь дополнительные знания о выбранном герое.
                    Даже если вы используете пикера, это не значит, что вы должны выбирать последним (вы можете оставить его для своего мида или керри, чтобы их не контрили).
                    Попробуйте проанализировать, почему определенные герои лучше работают в определенных составах, даже если вы сделаете это после окончания игры. Это сделает вас лучшим игроком.
                    Драфт и выбор — огромная часть Dota 2. Это приложение поможет вам при принятии решений, но вы должны руководствоваться собственным мнением.

                    Как работает подбор?
                    Предложения для пика рассчитаны статистически из миллионов игр.
                    Приложение использует винрейты (процент побед). Это поможет подобрать оперативных героев в текущей мете и увеличит шансы на победу.
                </span>
            </section>

        </article>
    )
})

export default Header