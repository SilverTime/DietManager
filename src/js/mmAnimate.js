// mmAnimate 2.0 2014.11.25
/**
 * @cnName ��������
 * @enName mmAnimate
 * @introduce
 * <p>���ڵ�ʱ����Ķ�������</p>
 * <h3>ʹ�÷���</h3>
 * ```javascript
 avalon(elem).animate( properties [, duration] [, easing] [, complete] )
 avalon(elem).animate( properties, options )
 * ```
 */
define(["avalon"], function() {
    /*********************************************************************
     *                      ������                                   *
     **********************************************************************/
    var effect = avalon.fn.animate = function(properties, options) {
        var frame = new Frame(this[0])
        if (typeof properties === "number") { //�����һ��Ϊ����
            frame.duration = properties
            if (arguments.length === 1) {
                frame.playState = false
            }
        } else if (typeof properties === "object") {
            for (var name in properties) {//�����һ������
                var p = avalon.cssName(name) || name
                if (name !== p) {
                    properties[p] = properties[name] //ת��Ϊ�շ���borderTopWidth, styleFloat
                    delete properties[name] //ȥ�����ַ���� border-top-width, float
                }
            }
            frame.props = properties
        }
        addOptions.apply(frame, arguments)//����ڶ�,����...����
        //���ؼ�֡���뵽ʱ�����л�嵽���е�ĳһ֡�����ж�,�ȴ�֡���,�����ٽ���ʱ����
        insertFrame(frame)
        return this
    }

    //�ֽ��û��Ĵ���
    function addOptions(properties) {
        //����ڶ������Ƕ���
        for (var i = 1; i < arguments.length; i++) {
            addOption(this, arguments[i])
        }
        this.queue = !!(this.queue == null || this.queue) //�Ƿ�������ж�
        this.easing = avalon.easing[this.easing] ? this.easing : "ease"//������ʽ������
        this.count = (this.count === Infinity || isIndex(this.count)) ? this.count : 1
        this.gotoEnd = false//�Ƿ������ܵ����һ֡
        var duration = this.duration
        this.duration = typeof duration === "number" ? duration : /^\d+ms$/.test(duration) ?
            parseFloat(duration) : /^\d+s$/.test(duration) ? parseFloat(duration) * 1000 : 400 //����ʱ��
    }
    function isIndex(s) {//�ж��ǷǸ�������������Ϊ������
        return +s === s >>> 0;
    }
    function addOption(frame, p, name) {
        if (!name) {
            switch (avalon.type(p)) {
                case "object":
                    for (var i in p) {
                        addOption(frame, p[i], i)
                    }
                    break
                case "number":
                    frame.duration = p
                    break
                case "string":
                    if (p === "slow") {
                        frame.duration = 600
                    } else if (p === "fast") {
                        frame.duration = 200
                    } else {
                        frame.easing = p
                    }
                    break
                case "function"://�󶨸��ֻص�
                    frame.bind("complete", p)
                    break
            }
        } else {
            if (typeof p === "function") {
                frame.bind(name, p)
            } else {
                frame[name] = p
            }
        }
    }
    /*********************************************************************
     *                          ������ʽ                              *
     **********************************************************************/
    avalon.mix(effect, {
        fps: 30
    })
    var bezier = {
        "linear": [0.250, 0.250, 0.750, 0.750],
        "ease": [0.250, 0.100, 0.250, 1.000],
        "swing": [0.250, 0.100, 0.250, 1.000],
        "easeIn": [0.420, 0.000, 1.000, 1.000],
        "easeOut": [0.000, 0.000, 0.580, 1.000],
        "easeInOut": [0.420, 0.000, 0.580, 1.000],
        "easeInQuad": [0.550, 0.085, 0.680, 0.530],
        "easeInCubic": [0.550, 0.055, 0.675, 0.190],
        "easeInQuart": [0.895, 0.030, 0.685, 0.220],
        "easeInQuint": [0.755, 0.050, 0.855, 0.060],
        "easeInSine": [0.470, 0.000, 0.745, 0.715],
        "easeInExpo": [0.950, 0.050, 0.795, 0.035],
        "easeInCirc": [0.600, 0.040, 0.980, 0.335],
        "easeInBack": [0.600, -0.280, 0.735, 0.045],
        "easeOutQuad": [0.250, 0.460, 0.450, 0.940],
        "easeOutCubic": [0.215, 0.610, 0.355, 1.000],
        "easeOutQuart": [0.165, 0.840, 0.440, 1.000],
        "easeOutQuint": [0.230, 1.000, 0.320, 1.000],
        "easeOutSine": [0.390, 0.575, 0.565, 1.000],
        "easeOutExpo": [0.190, 1.000, 0.220, 1.000],
        "easeOutCirc": [0.075, 0.820, 0.165, 1.000],
        "easeOutBack": [0.175, 0.885, 0.320, 1.275],
        "easeInOutQuad": [0.455, 0.030, 0.515, 0.955],
        "easeInOutCubic": [0.645, 0.045, 0.355, 1.000],
        "easeInOutQuart": [0.770, 0.000, 0.175, 1.000],
        "easeInOutQuint": [0.860, 0.000, 0.070, 1.000],
        "easeInOutSine": [0.445, 0.050, 0.550, 0.950],
        "easeInOutExpo": [1.000, 0.000, 0.000, 1.000],
        "easeInOutCirc": [0.785, 0.135, 0.150, 0.860],
        "easeInOutBack": [0.680, -0.550, 0.265, 1.550],
        "custom": [0.000, 0.350, 0.500, 1.300],
        "random": [Math.random().toFixed(3),
            Math.random().toFixed(3),
            Math.random().toFixed(3),
            Math.random().toFixed(3)]
    }
    avalon.easing = {//������ʽ
    }
    //https://github.com/rdallasgray/bez
    //http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
    //https://github.com/rightjs/rightjs-core/blob/master/src/fx/fx.js
    avalon.each(bezier, function(key, value) {
        avalon.easing[key] = bezierToEasing([value[0], value[1]], [value[2], value[3]])
    })

    function bezierToEasing(p1, p2) {
        var A = [null, null], B = [null, null], C = [null, null],
            derivative = function(t, ax) {
                C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            bezierXY = function(t) {
                return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            parametric = function(t) {
                var x = t, i = 0, z;
                while (++i < 14) {
                    z = derivative(x, 0) - t;
                    if (Math.abs(z) < 1e-3)
                        break;
                    x -= z / bezierXY(x);
                }
                return x;
            };
        return function(t) {
            return derivative(parametric(t), 1);
        }
    }
    /*********************************************************************
     *                      ��ʱ��                                  *
     **********************************************************************/
    function AnimationTimer() {
        //������msRequestAnimationFrame��IE10��Chrome24ֱ����:requestAnimationFrame
        if (window.requestAnimationFrame) {
            return {
                start: requestAnimationFrame.bind(window),
                stop: cancelAnimationFrame.bind(window)
            }
            //Firefox11-û��ʵ��cancelRequestAnimationFrame
            //����mozRequestAnimationFrame���׼�������
        } else if (window.mozCancelRequestAnimationFrame && window.mozCancelAnimationFrame) {
            return {
                start: mozRequestAnimationFrame.bind(window),
                stop: mozCancelAnimationFrame.bind(window)
            }
        } else if (window.webkitRequestAnimationFrame && webkitRequestAnimationFrame(String)) {
            return {//����ĳ�������webKit�汾��û��time����
                start: webkitRequestAnimationFrame.bind(window),
                stop: (window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame).bind(window)
            }
        } else {
            var timeLast = 0
            // http://jsperf.com/date-now-vs-date-gettime/11
            var now = Date.now || function() {
                    return (new Date).getTime()
                }
            return {
                start: function(callback) {//��Ҫ����IE������ǧ���ټ�Ҫ�������
                    var timeCurrent = now()
                    // http://jsperf.com/math-max-vs-comparison/3
                    var timeDelta = 16 - (timeCurrent - timeLast)
                    if (timeDelta < 0)
                        timeDelta = 0
                    timeLast = timeCurrent + timeDelta
                    return setTimeout(callback, timeDelta)
                },
                stop: function(id) {
                    clearTimeout(id)
                }
            };
        }
    }
    var Timer = new AnimationTimer()
    var TimerID = null
    /*********************************************************************
     *                      ʱ����                                    *
     **********************************************************************/
    /**
     * @other
     * <p>һ��ʱ����<code>avalon.timeline</code>�а������֡, һ֡�����и��ֽ��䶯��, ����Ĺ켣���ɻ�����ʽ���涨</p>
     */
    var timeline = avalon.timeline = []
    function insertFrame(frame) { //����ؼ�֡
        if (frame.queue) { //������뵽���е�ĳһ֡�����ж�
            var gotoQueue = 1
            for (var i = timeline.length, el; el = timeline[--i]; ) {
                if (el.elem === frame.elem) { //�����һ��
                    el.troops.push(frame) //���ж�
                    gotoQueue = 0
                    break
                }
            }
            if (gotoQueue) { //����ڶ���
                timeline.unshift(frame)
            }
        } else {//����ʱ����
            timeline.push(frame)
        }
        if (!TimerID) { //ʱ����ֻҪ����֡�ͻ�ִ�ж�ʱ��
            TimerID = Timer.start(function raf() {
                if (TimerID) {
                    deleteFrame()
                    Timer.start(raf)
                }
            })
        }
    }

    function deleteFrame() {
        var i = timeline.length
        while (--i >= 0) {
            if (!timeline[i].paused) { //���û�б���ͣ
                //�������false��Ԫ�ز�����,�ʹ�ʱ������ɾ���˹ؼ�֡
                if (!(timeline[i].elem && enterFrame(timeline[i], i))) {
                    timeline.splice(i, 1)
                }
            }
        }
        if (timeline.length === 0) {
            //���ʱ��������û�йؼ�֡,��ôֹͣ��ʱ��,��Լ����
            Timer.stop(TimerID)
            TimerID = null
        }
    }

    function enterFrame(frame, index) {
        //�������жӵĶ���ʵ�����в��䶯��(update)��
        //���ڶ��������󣬴����ж�ѡȡ��һ������ʵ��ȡ������
        var now = +new Date
        if (!frame.startTime) { //��һ֡
            if (frame.playState) {
                frame.fire("before")//������ʼǰ��ЩԤ����
                //�˷��������ڻ�ȡԪ�����������״̬,��Ԫ�ش��ڿɶ���״̬(display����Ϊnone)
                //����overflow,��after�ص�
                frame.build()
            }
            frame.startTime = now
        } else { //�м��Զ����ɵĲ���
            var per = (now - frame.startTime) / frame.duration
            var end = frame.gotoEnd || per >= 1 //gotoEnd���Ա������stop�����ٿ�,ǿ����ֹ
            if (frame.playState) {
                for (var i = 0, tween; tween = frame.tweens[i++]; ) {
                    tween.run(per, end)
                }
                frame.fire("step") //ÿִ��һ֡���õĻص�
            }
            if (end || frame.count == 0) { //���һ֡
                frame.count--
                frame.fire("after") //����������ִ�е�һЩ��β����
                if (frame.count <= 0) {
                    frame.fire("complete") //ִ���û��ص�
                    var neo = frame.troops.shift()
                    if (!neo) {
                        return false
                    } //��������ŶӵĶ���,��������
                    timeline[index] = neo
                    neo.troops = frame.troops
                } else {
                    frame.startTime = frame.gotoEnd = false
                    frame.frameName = ("fx" + Math.random()).replace(/0\./, "")
                    if (frame.revert) {
                        frame.revertTweens()
                    } else {
                        frame.createTweens(avalon.isHidden(frame.elem))
                    }  //��������˵���

                }
            }
        }
        return true
    }
    /*********************************************************************
     *                                  ��֡����                            *
     **********************************************************************/
    /**
     * @other
     * <p>avalon.fn.delay, avalon.fn.slideDown, avalon.fn.slideUp,
     * avalon.fn.slideToggle, avalon.fn.fadeIn, avalon.fn.fadeOut,avalon.fn.fadeToggle
     * avalon.fn.show, avalon.fn.hide, avalon.fn.toggle��Щ������ʵ����avalon.fn.animate��
     * ���ΰ�װ������<code>avalon.fn.animate</code>���ڣ����ǵĹ��ܶ�����ʱ�������һ��֡����(Frame)</p>
     *<p>֡��������ʱ�����ڴ���һ��ʱ�䣬�����޸�ĳһԪ�ص�N����ʽ�����ԡ�</p>
     *<p><strong>Frame</strong>����ӵ�����·���������</p>
     <table class="table-doc" border="1">
     <colgroup>
     <col width="180"/> <col width="80"/> <col width="120"/>
     </colgroup>
     <tr>
     <th>����</th><th>����</th><th>Ĭ��ֵ</th><th>˵��</th>
     </tr>
     <tr>
     <td>elem</td><td>Element</td><td></td><td>���ڶ���״̬��Ԫ�ؽڵ�</td>
     </tr>
     <tr>
     <td>$events</td><td>Object</td><td>{}</td><td>���ø��ֻص�</td>
     </tr>
     <tr>
     <td>troops</td><td>Array</td><td>[]</td><td>��queueΪtrue��ͬһ��Ԫ�ز�����֡������������</td>
     </tr>
     <tr>
     <td>tweens</td><td>Array</td><td>[]</td><td>���ø��ֲ��䶯��Tween</td>
     </tr>
     <tr>
     <td>orig</td><td>Object</td><td>{}</td><td>���涯��֮ǰ����ʽ�����������غ�ԭ</td>
     </tr>
     <tr>
     <td>playState</td><td>Boolean</td><td>true</td><td>�Ƿ��ܽ��ж�����������ͣ�˴�ֵ��Ϊfalse</td>
     </tr>
     <tr>
     <td>frameName</td><td>String</td><td>("fx" + Math.random()).replace(/0\./,"")</td><td>��ǰ����������</td>
     </tr>
     <tr>
     <td>count</td><td>Number</td><td>1</td><td>���ظ����ٴ�</td>
     </tr>
     <tr>
     <td>bind(type, fn, unshift)</td><td></td><td></td><td>
     <table border="1">
     <tbody><tr>
     <th style="width:100px">������/����ֵ</th><th style="width:70px">����</th> <th>˵��</th> </tr>
     <tr>
     <td>type</td>
     <td>String</td>
     <td>�¼���</td>
     </tr>
     <tr>
     <td>fn</td>
     <td>Function</td>
     <td>�ص���thisΪԪ�ؽڵ�</td>
     </tr>
     <tr>
     <td>unshift</td>
     <td>Undefined|String</td>
     <td>�ж��ǲ�����ǰ�������</td>
     </tr>
     </tbody></table>
     </td>
     </tr>
     <tr>
     <td>fire(type, [otherArgs..])</td><td></td><td></td><td>�����ص������Դ�N�����</td></tr>
     </table>
     */
    function Frame(elem) {
        this.$events = {}
        this.elem = elem
        this.troops = []
        this.tweens = []
        this.orig = {}
        this.props = {}
        this.count = 1
        this.frameName = ("fx" + Math.random()).replace(/0\./, "")
        this.playState = true //�Ƿ��ܸ���
    }
    var root = document.documentElement

    avalon.isHidden = function(node) {
        return  node.sourceIndex === 0 || avalon.css(node, "display") === "none" || !avalon.contains(root, node)
    }

    Frame.prototype = {
        constructor: Frame,
        bind: function(type, fn, unshift) {
            var fns = this.$events[type] || (this.$events[type] = []);
            var method = unshift ? "unshift" : "push"
            fns[method](fn)
        },
        fire: function(type) {
            var args = Array.prototype.slice.call(arguments, 1)
            var fns = this.$events[type] || []
            for (var i = 0, fn; fn = fns[i++]; ) {
                fn.call(this.elem, args)
            }
        },
        build: function() {
            var frame = this
            var elem = frame.elem
            var props = frame.props
            var style = elem.style
            var inlineBlockNeedsLayout = !window.getComputedStyle
            //show ��ʼʱ������width1 height1 ����ԭ����width height display��Ϊinline-block��block overflow���� ��ֵ��width1��height1��
            //hide ����ԭ����width height ��ֵΪ(0,0) overflow���� ����ʱdisplay��Ϊnone;
            //toggle ��ʼʱ�ж����Ƿ����أ�ʹ���پ���ʹ�ú��ֲ���
            //����Ƕ�������뽫����ʾ����
            var hidden = avalon.isHidden(elem)
            if ("height" in props || "width" in props) {
                frame.overflow = [style.overflow, style.overflowX, style.overflowY]
            }
            var display = style.display || avalon.css(elem, "display")
            var oldDisplay = elem.getAttribute("olddisplay")
            if (!oldDisplay) {
                if (display === "none") {
                    style.display = ""//����������ڵ�display
                    display = avalon.css(elem, "display")
                    if (display === "none") {
                        display = avalon.parseDisplay(elem.nodeName)
                    }
                }
                elem.setAttribute("olddisplay", display)
            } else {
                if (display !== "none") {
                    elem.setAttribute("olddisplay", display)
                } else {
                    display = oldDisplay
                }
            }
            style.display = display
            //��������Ԫ�ص�displayΪinline-block����������Խ���width/height�Ķ�������
            if (display === "inline" && avalon.css(elem, "float") === "none") {
                if (!inlineBlockNeedsLayout || avalon.parseDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block"
                } else {
                    style.zoom = 1
                }
            }
            this.createTweens(hidden)

            if (frame.overflow) {
                style.overflow = "hidden"
                frame.bind("after", function() {
                    style.overflow = frame.overflow[ 0 ]
                    style.overflowX = frame.overflow[ 1 ]
                    style.overflowY = frame.overflow[ 2 ]
                })
            }

            frame.bind("after", function() {
                if (frame.showState === "hide") {
                    this.style.display = "none"
                    this.dataShow = {}
                    for (var i in frame.orig) { //��ԭΪ��ʼ״̬
                        this.dataShow[i] = frame.orig[i]
                        avalon.css(this, i, frame.orig[i])
                    }
                }
            })
            this.build = avalon.noop //������Ч��
        },
        createTweens: function(hidden) {
            this.tweens = []
            for (var i in this.props) {
                createTweenImpl(this, i, this.props[i], hidden)
            }
        },
        revertTweens: function() {
            for (var i = 0, tween; tween = this.tweens[i++]; ) {
                var start = tween.start
                var end = tween.end
                tween.start = end
                tween.end = start
                this.props[tween.name] = Array.isArray(tween.start) ?
                "rgb(" + tween.start + ")" :
                    (tween.unit ? tween.start + tween.unit : tween.start)
            }
        }
    }

    var rfxnum = new RegExp("^(?:([+-])=|)(" + (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source + ")([a-z%]*)$", "i")

    function createTweenImpl(frame, name, value, hidden) {
        var elem = frame.elem
        var dataShow = elem.dataShow || {}
        var tween = new Tween(name, frame)
        var from = dataShow[name] || tween.cur() //ȡ����ʼֵ
        var to
        if (/color$/i.test(name)) {
            //���ڷֽ����԰��е���ʽ������,��ɿ��Լ��������
            parts = [color2array(from), color2array(value)]
        } else {
            parts = rfxnum.exec(from)
            var unit = parts && parts[ 3 ] || (avalon.cssNumber[ name ] ? "" : "px")
            //���� toggle, show, hide
            if (value === "toggle") {
                value = hidden ? "show" : "hide"
            }
            if (value === "show") {
                frame.showState = "show"
                avalon.css(elem, name, 0);
                parts = [0, parseFloat(from)]
            } else if (value === "hide") {
                frame.showState = "hide"
                frame.orig[name] = from
                parts = [parseFloat(from), 0]
                value = 0;
            } else {// "18em"  "+=18em"
                parts = rfxnum.exec(value)//["+=18em", "+=", "18", "em"]
                if (parts) {
                    parts[2] = parseFloat(parts[2]) //18
                    if (parts[3] && parts[ 3 ] !== unit) {//������ڵ�λ��������֮ǰ�Ĳ�һ������Ҫת��
                        var clone = elem.cloneNode(true)
                        clone.style.visibility = "hidden"
                        clone.style.position = "absolute"
                        elem.parentNode.appendChild(clone)
                        avalon.css(clone, name, parts[2] + (parts[3] ? parts[3] : 0))
                        parts[ 2 ] = parseFloat(avalon.css(clone, name))
                        elem.parentNode.removeChild(clone)
                    }
                    to = parts[2]
                    from = parseFloat(from)
                    if (parts[ 1 ]) {
                        to = from + (parts[ 1 ] + 1) * parts[ 2 ]
                    }
                    parts = [from, to]
                }
            }
        }
        from = parts[0]
        to = parts[1]
        if (from + "" !== to + "") { //��������ֵֹ��һ������ʽ������
            tween.start = from
            tween.end = to
            tween.unit = unit || ""
            frame.tweens.push(tween)
        } else {
            delete frame.props[name]
        }
    }
    /*********************************************************************
     *                                 ���䶯��                            *
     **********************************************************************/
    /**
     * @other
     * <p>���䶯��<code>Tween</code>������ʵ�ָ�����Ч����С��λ���������޸�ĳһ������ֵ����ʽֵ</p>
     *<p><strong>Tween</strong>����ӵ�����·���������</p>
     <table class="table-doc" border="1">
     <colgroup>
     <col width="180"/> <col width="80"/> <col width="120"/>
     </colgroup>
     <tr>
     <th>����</th><th>����</th><th>Ĭ��ֵ</th><th>˵��</th>
     </tr>
     <tr>
     <td>elem</td><td>Element</td><td></td><td>Ԫ�ؽڵ�</td>
     </tr>
     <tr>
     <td>name</td><td>String</td><td>""</td><td>����������ʽ�������շ������</td>
     </tr>
     <tr>
     <td>start</td><td>Number</td><td>0</td><td>����Ŀ�ʼֵ</td>
     </tr>
     <tr>
     <td>end</td><td>Number</td><td>0</td><td>����Ľ���ֵ</td>
     </tr>
     <tr>
     <td>now</td><td>Number</td><td>0</td><td>��ǰֵ</td>
     </tr>
     <tr>
     <td>run(per, end)</td><td></td><td></td><td>����Ԫ�ص�ĳһ��ʽ�����ԣ��ڲ�����</td>
     </tr>
     <tr>
     <td>cur()</td><td></td><td></td><td>ȡ�õ�ǰֵ</td>
     </tr>
     </table>
     */
    function Tween(prop, options) {
        this.elem = options.elem
        this.name = prop
        this.easing = avalon.easing[options.easing]
        if (/color$/i.test(prop)) {
            this.update = this.updateColor
        }
    }

    Tween.prototype = {
        constructor: Tween,
        cur: function() {//ȡ�õ�ǰֵ
            var hook = Tween.propHooks[ this.name ]
            return hook && hook.get ?
                hook.get(this) :
                Tween.propHooks._default.get(this)
        },
        run: function(per, end) {//����Ԫ�ص�ĳһ��ʽ������
            this.update(per, end)
            var hook = Tween.propHooks[ this.name ]
            if (hook && hook.set) {
                hook.set(this)
            } else {
                Tween.propHooks._default.set(this)
            }
        },
        updateColor: function(per, end) {
            if (end) {
                var rgb = this.end
            } else {
                var pos = this.easing(per)
                rgb = this.start.map(function(from, i) {
                    return Math.max(Math.min(parseInt(from + (this.end[i] - from) * pos, 10), 255), 0)
                }, this)
            }
            this.now = "rgb(" + rgb + ")"
        },
        update: function(per, end) {
            this.now = (end ? this.end : this.start + this.easing(per) * (this.end - this.start))
        }
    }

    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result = avalon.css(tween.elem, tween.name)
                return !result || result === "auto" ? 0 : result
            },
            set: function(tween) {
                avalon.css(tween.elem, tween.name, tween.now + tween.unit)
            }
        }
    }

    ;
    ["scrollTop", "scrollLeft"].forEach(function(name) {
        Tween.propHooks[name] = {
            get: function(tween) {
                return tween.elem[tween.name]
            },
            set: function(tween) {
                tween.elem[tween.name] = tween.now
            }
        }
    })
    /*********************************************************************
     *                                  ԭ�ͷ���                            *
     **********************************************************************/

    avalon.fn.mix({
        delay: function(ms) {
            return this.animate(ms)
        },
        pause: function() {
            var cur = this[0]
            for (var i = 0, frame; frame = timeline[i]; i++) {
                if (frame.elem === cur) {
                    frame.paused = new Date - 0
                }
            }
            return this
        },
        resume: function() {
            var now = new Date
            var elem = this[0]
            for (var i = 0, frame; frame = timeline[i]; i++) {
                if (frame.elem === elem) {
                    frame.startTime += (now - frame.paused)
                    delete frame.paused
                }
            }
            return this
        },
        //���clearQueueΪtrue���Ƿ�����ж�
        //���gotoEnd Ϊtrue���Ƿ������˶������һ֡
        stop: function(clearQueue, gotoEnd) {
            clearQueue = clearQueue ? "1" : ""
            gotoEnd = gotoEnd ? "1" : "0"
            var stopCode = parseInt(clearQueue + gotoEnd, 2) //����0 1 2 3
            var node = this[0]
            for (var i = 0, frame; frame = timeline[i]; i++) {
                if (frame.elem === node) {
                    frame.gotoEnd = true
                    frame.count = 0
                    switch (stopCode) { //�����ʱ������stop����
                        case 0:
                            // false false �жϵ�ǰ������������һ������
                            frame.playState = frame.revert = false
                            break
                        case 1:
                            // false true�����������һ֡��������һ������
                            frame.revert = false
                            break
                        case 2:
                            // true false��ո�Ԫ�ص����ж���
                            delete frame.elem
                            break
                        case 3:
                            // true true ������ɸ�Ԫ�ص����ж���
                            frame.troops.forEach(function(a) {
                                a.gotoEnd = true
                            })
                            break
                    }
                }
            }
            return this
        }
    })
    /*********************************************************************
     *                                 ������Ч                            *
     **********************************************************************/
    var fxAttrs = [
        ["height", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
        ["opacity"]
    ]
    function genFx(type, num) { //�������԰�
        var obj = {}
        fxAttrs.concat.apply([], fxAttrs.slice(0, num)).forEach(function(name) {
            obj[name] = type
        })
        return obj
    }


    var effects = {
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }

    avalon.each(effects, function(method, props) {
        avalon.fn[method] = function() {
            var args = [].concat.apply([props, {frameName: method}], arguments)
            return this.animate.apply(this, args)
        }
    })

    String("toggle,show,hide").replace(avalon.rword, function(name) {
        avalon.fn[name] = function() {
            var args = [].concat.apply([genFx(name, 3), {frameName: name}], arguments)
            return this.animate.apply(this, args)
        }
    })
    /*********************************************************************
     *                      ת��������ɫֵΪRGB����                            *
     **********************************************************************/
    var colorMap = {
        "black": [0, 0, 0],
        "gray": [128, 128, 128],
        "white": [255, 255, 255],
        "orange": [255, 165, 0],
        "red": [255, 0, 0],
        "green": [0, 128, 0],
        "yellow": [255, 255, 0],
        "blue": [0, 0, 255]
    }
    if (window.VBArray) {
        var parseColor = new function() {
            var body
            try {
                var doc = new ActiveXObject("htmlfile")
                doc.write("<body>")
                doc.close()
                body = doc.body
            } catch (e) {
                body = createPopup().document.body
            }
            var range = body.createTextRange()
            return function(color) {
                body.style.color = String(color).trim()
                var value = range.queryCommandValue("ForeColor")
                return [value & 0xff, (value & 0xff00) >> 8, (value & 0xff0000) >> 16]
            }
        }
    }

    function color2array(val) { //���ַ����������
        var color = val.toLowerCase(),
            ret = []
        if (colorMap[color]) {
            return colorMap[color]
        }
        if (color.indexOf("rgb") === 0) {
            var match = color.match(/(\d+%?)/g),
                factor = match[0].indexOf("%") !== -1 ? 2.55 : 1
            return (colorMap[color] = [parseInt(match[0]) * factor, parseInt(match[1]) * factor, parseInt(match[2]) * factor])
        } else if (color.charAt(0) === '#') {
            if (color.length === 4)
                color = color.replace(/([^#])/g, '$1$1')
            color.replace(/\w{2}/g, function(a) {
                ret.push(parseInt(a, 16))
            })
            return (colorMap[color] = ret)
        }
        if (window.VBArray) {
            return (colorMap[color] = parseColor(color))
        }
        return colorMap.white
    }
    avalon.parseColor = color2array
    return avalon
})
