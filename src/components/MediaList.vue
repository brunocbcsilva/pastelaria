<template><!--eslint-disable-->
    <transition-group name="media" tag="div" class="container">
	    <div class="media row mb-4" v-for="(i, idx) in list" :key="idx">
            <header class="media-header d-flex" :class="{'drink': i.drink}">
                <div class="col-6 title">{{ i.title }}</div>
                <div class="col-6 amount d-flex justify-content-end">
                    <span class="d-none d-md-inline-block">R$ {{ i.amount }}</span>
                    <button type="button" class="button_remove" @click="removeItem(i)">&times;</button>
                </div>
            </header>

            <section class="media-body">
                <div v-if="i.file != ''" class="media-image" :style="{ backgroundImage: 'url(' + i.file + ')' }"></div>
                <div v-else class="media-image"></div>
                <p><strong>Sabor:</strong> {{ i.taste }}</p>
                <p><strong>Descrição:</strong> {{ i.description || 'Produto sem descrição.' }}</p>
                <p class="amount-mobile">R$ {{ i.amount }}</p>
            </section>
        </div>
    </transition-group>
</template>

<script>
/*eslint-disable*/
    export default {
        name: "MediaList",
        props: {
            list: Array
        },
        data() {
            return {
                noImg: "../assets/no-image.png",
            }
        },
        methods: {
            removeItem(item) {
                this.$store.commit('REMOVE_ITEM', {
                    item: item
                });

                this.$store.dispatch('storageSave', { obj: this.list });
                this.$toast.warning(`${item.title} removido com sucesso.`, "OK");
            },
	        editItem(item) {
                this.$store.commit('EDIT_ITEM', { item: item });
                this.$store.commit('SHOW_MODAL');
	        },
        }
    };
</script>

<style scoped lang="scss">
    @import "../styles/variables";
    @import "../styles/mixins";

    .button_remove {
        @include square(32px);
        background: $white;
        border: 0;
        border-radius: 3rem;
        font-size: 22px;
        line-height: 22px;
        color: $dark-red;
        margin-left: 1.75rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        transform: scale(.8) rotate(0);
        cursor: pointer;

        &:hover,
        &:focus {
            transform: scale(1) rotate(180deg);
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
    }

    .media-move,
    .media-enter-active,
    .media-leave-active {
        transition: all 365ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .media-enter,
    .media-leave-to {
        transform: translateY(-4rem);
        opacity: 0;
    }

    .media {
        position: relative;
        box-shadow: 0 0 30px rgba($white, .19);
        border-radius: 1.5rem;
        background: $white;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);

        @media(min-width: 992px) {
            padding-left: 4rem;
            transform: scale(.96);
        }

        &:hover {
            transform: scale(1);
        }

        .media-image {
            overflow: hidden;
            background: #f9f9f9 url("../assets/no-image.png") center center no-repeat;
            background-size: contain;
            border: 1px solid #f2f2f2;
            border-radius: 1rem;
            box-shadow: -10px 10px 30px 0px rgba(116, 11, 11, 0.1);
            margin: 0 auto 3rem;
            @include square(220px);

            @media(min-width: 992px) {
                position: absolute;
                top: 0;
                left: 0;
                margin: unset;
                transform: translate(-4rem, -3rem);
                @include square(160px);
            }
        }

        .media-header {
            width: 100%;
            background: $red;
            border-radius: $card-header-radius;
            padding: 1.15rem 1rem;

            @media(min-width: 992px) {
                padding: 1.15rem 1rem 1.15rem 10rem;
            }

            &.drink {
                background: #3dcaff;

                .title {
                    color: $white;
                }
            }

            %font-header {
                letter-spacing: 0;
                font-weight: bold;
                font-style: italic;
            }

            .title {
                color: $yellow;
                font-size: 20px;
                @extend %font-header;

                @media(min-width: 1200px) {
                    font-size: 32px;
                }
            }

            .amount {
                position: relative;
                color: $white;
                font-size: 20px;
                @extend %font-header;

                @media(min-width: 1200px) {
                    font-size: 32px;
                }
            }
        }

        .media-body {
            position: relative;
            width: 100%;
            box-shadow: $panel-shadow;
            border-radius: $card-body-radius;
            padding: 1rem;

            @media (min-width: 992px) {
                padding: 1.25rem 1rem 1.25rem 10rem;
            }

            strong {
                font-style: italic;
            }

            p {
                letter-spacing: 0;
                font-size: 18px;
                line-height: 24px;
                color: $dark-red;

                @media(min-width: 1200px) {
                    font-size: 24px;
                    line-height: 32px;
                }
            }

            .amount-mobile {
                text-align: center;
                font-weight: bold;
                font-size: 32px;
                font-style: italic;

                @media(min-width: 768px) {
                    display: none;
                }
            }
        }
    }
</style>
